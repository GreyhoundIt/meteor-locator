

export default function sketch(p){
    let mapimg;

    let clat = 0;
    let clon = 0;

    let ww = 1024;
    let hh = 512;

    let zoom = 1;

    p.preload = () =>{
            // The clon and clat in this url are edited to be in the correct order.
            mapimg = p.loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
                clon + ',' + clat + ',' + zoom + '/' +
                ww + 'x' + hh +
                `?access_token=pk.eyJ1IjoiZ3JleWhvdW5kaXQiLCJhIjoiY2p0Ym8xNmthMGh1eTQ0cGZzMTBtc253NCJ9.AOlt3TNM7rkrTVD2Lec1Xw`);
    };

    p.setup = () => {
        p.createCanvas(1024, 512);
        p.translate(p.width/2, p.height/2);
        p.imageMode(p.CENTER);
        p.image(mapimg, 0, 0);

    };

    p.draw = () => {

        // p.background('orangered');
        //  p.ellipse(150, 100, 10, 10);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (NewProps) => {
        p.createCanvas(1024, 512);
        p.translate(p.width/2, p.height/2);
        p.imageMode(p.CENTER);
        p.image(mapimg, 0, 0);
        p.fill(86,237,245);
        for ( var i = 0; i < NewProps.data.length; i++) {
            let meteor = NewProps.data[i];
            if(meteor.reclong && meteor.reclat) {
                let cx = p.mercX(clon);
                let cy = p.mercY(clat);
                let x = p.mercX(meteor.reclong) - cx;
                let y = p.mercY(meteor.reclat) - cy;
                p.ellipse(x, y, 5, 5);
            }
        };
    };

    p.mercX = (lon) => {
        lon = p.radians(lon);
        let a = (258 / p.PI) * p.pow(2, zoom);
        let b = lon + p.PI;
        return a*b;
    };

     p.mercY = (lat) => {
        lat = p.radians(lat);
        let a = (256 / p.PI) * p.pow(2, zoom);
        let b = p.tan(p.PI/4 + lat / 2);
        let c = p.PI - p.log(b);
        return a*c;
    }


}