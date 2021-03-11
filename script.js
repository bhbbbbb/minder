var zOrder = -1;
var lva_idx = 0;
var cloud_style_idx = 0;
var numCloud_const = 12;
const delay = 20;
var left_value_arr = [];
var first_in = 0;
//var spot_idx = 2;
//var spot_pos_y = 7;
let vm = new Vue({
    el: "#home",
    data: {
        //randomStyle: getRandomStyle(),
        numCloud: numCloud_const,
        // cloudStyle: {
        //     zoom: "20%",
        //     filter: "opacity(0.9)",
        //     position: "absolute",
        //     left: "230em", //-10~230
        //     top: "3em", //-10~3
        //     "z-index": "-1"
        // },
        spot_idx: 2,
        spot_pos_x: 76,
        spot_pos_y: 260,
        spot_size:61,
        //spotImage: "./image/spot_2.png",
        timer_spot: "",
        timer_cloud: "",
        timer_spot_move: "",
        cloudStyleArr: [],
        dayCloudArr: [],
        time: 0, // 0 is night, 100 is completely day
        is_raining: true,
        
    },

    methods: {
        GetRandomStyle() {
            zOrder = -1;
            
            let tem;
            if(this.is_raining)
                $(".clouds.night").fadeOut(1000);

            else
                $(".clouds.day").fadeOut(1000);

            setTimeout(() => {
                this.cloudStyleArr = [];
                this.dayCloudArr = [];
                for(let i = 0; i < numCloud_const; i++) {
                    // console.log(left_value_arr, lva_idx);
                
                    tem = {
                        width: String(randomBetween(20, 25)) + "%",
                        filter: "opacity(" + String(randomBetween(0.5, 1)) + ")",
                        position: "absolute",
                        "z-index": zOrder++,
                        //top: String(randomBetween(-6,8)) + "em",
                        left: String(left_value_arr[lva_idx]) + "%",
                        //left: String(randomBetween(0,100)) + "%",
                        top: String(randomBetween(-5, 15)) + "%",
                        transform: "rotate(" + String(Math.round(randomBetween(0, 1))*180) + "deg)",
                    };
                    this.cloudStyleArr.push(tem);
                    
                    tem =  {
                        width: String(randomBetween(20, 25)) + "%",
                        filter: "opacity(" + String(randomBetween(0.5, 1)) + ")",
                        position: "absolute",
                        "z-index": zOrder++,
                        //top: String(randomBetween(-6,8)) + "em",
                        left: String(left_value_arr[lva_idx]) + "%",
                        //left: String(randomBetween(0,100)) + "%",
                        top: String(randomBetween(-5, 15)) + "%", transform: "rotate(" + String(Math.round(randomBetween(0, 1))*180) + "deg)",
                    };
                    this.dayCloudArr.push(tem);
                    
                    
                    
                    lva_idx++;
                    
                    
                }
            }, first_in);
            first_in = 900;
            if(this.is_raining)
                $(".clouds.night").fadeIn(1000);
            else
                $(".clouds.day").fadeIn(1000);
            //console.log(this.cloudStyleArr);
            //console.log(zOrder);
            //return tem;
        },
        ChangeSpotImage() {
            if(this.spot_idx == 1) return;
            if(this.spot_idx === 5)
                this.spot_idx = 2;

            else if(this.spot_idx === 2)
                this.spot_idx = 5;
            
            //return "image/spot_" + String(spot_idx) + ".png";
        },

        setTimer() {
            this.timer_spot = setInterval(this.ChangeSpotImage, 1000);
            this.timer_cloud = setInterval(this.GetRandomStyle, 8000);
        },

        HoverOnSpot() {
            //this.spotImage = "image/spot_1.png";
            if(this.is_raining) this.spot_idx = 1;
        },

        LeaveSpot() {
            //this.spotImage = "image/spot_2.png";
            if(this.is_raining) this.spot_idx = 2;
        },

        ClickSpot() {
            this.is_raining = false;
            clearInterval(this.timer_spot);
            clearInterval(this.timer_cloud);
            sky_height = $("#scene").height();
            character_height = $("#character").height();
            spot_dest_height = sky_height - character_height * 0.62;
            spot_width = $("#spot").width();
            spot_max_width = spot_dest_height / 590 * 4.5;
            if (spot_max_width < 2) spot_max_width = 2;
            left_shift = (spot_max_width - 1.5) / 2;
            // console.log(spot_max_width, left_shift);
            $("#spot").animate({
                "bottom": String(spot_dest_height) + "px", 
                "width": String(spot_max_width) + "em",
                "left" : String(2.9 - left_shift) + "em"
            }, 1500);
            
            scene_width = $("#scene").width();
            y_origin = sky_height - character_height;
            for(let i = 0; i < numCloud_const; i++) {
                cur_left = parseFloat($(".cloud#" + String(i)).css("left"));
                cur_top = parseFloat($(".cloud#" + String(i)).css("top"));
                dest_left = cur_left + (cur_left - scene_width/2) * 0.2;
                dest_top = cur_top + (cur_top - y_origin) * 0.4;
                // console.log(cur_left, cur_top, dest_left, dest_top);
                $(".cloud#" + String(i)).animate({
                    left: String(dest_left) + "px",
                    top: String(dest_top) + "px"
                }, 1500);
            }
            // for (let i = 0; i < Math.floor(numCloud_const/3); i++) {
            //     $(".cloud#" + String(i)).animate({
            //         left: "-10%",
            //         top: "-10%"
            //     }, 1500);
            // }

            // for (let i = Math.floor(numCloud_const/3); i < Math.floor(numCloud_const*2/3); i++) {
            //     $(".cloud#" + String(i)).animate({
                    
            //         top: "-20%"
            //     }, 1500);
            // }

            // for (let i = Math.floor(numCloud_const*2/3); i < numCloud_const; i++) {
            //     $(".cloud#" + String(i)).animate({
            //         left: "110%",
            //         top: "-10%"
            //     }, 1500);
            // }


            $(".night").fadeOut(1500);
            wi = $("#text_box").width();
            console.log(wi);
            $("#text_box").animate({
                right: String((scene_width/2-wi)/2) + "px",
                opacity: 1,
            }, 1500);
            
            setTimeout(() => {
                $(".day.clouds").fadeIn(1500);
            }, 500)
            
            

            this.timer_cloud = setInterval(this.GetRandomStyle, 8000);
            // if(this.is_raining) {
            //     this.is_raining = false;
            //     clearInterval(this.timer_spot);
            //     clearInterval(this.timer_cloud);
                
            //     let height_count = 0;
            //     this.spot_idx = 1;
            //     this.timer_spot_move = setInterval(() => {
            //         this.spot_pos_y += 0.28 * delay
            //         height_count += delay;
                    
            //         this.time += delay/10
            //         //console.log(height_count, this.time);
            //         this.spot_size += 0.14 * delay;
            //         this.spot_pos_x -= 0.07 * delay;
                    
            //         if(height_count > 1000) {
            //             clearInterval(this.timer_spot_move);
            //             //this.GetRandomStyle();
            //             this.timer_cloud = setInterval(this.GetRandomStyle, 5000)
            //         }
            //     }, delay);
            // }
        }

    },

    computed: {
        SpotImage() {
            return "image/spot_" + String(this.spot_idx) + ".png";
        },

        // SpotStyle() {
        //     return {
        //         left: String (this.spot_pos_x) + "px",
        //         bottom: String(this.spot_pos_y) + "px",
        //         width: String(this.spot_size) + "px",
        //     }
        // },

        RainBgStyle() {
            return {
                width: "100%",
                filter: "opacity(" + String(1 - this.time/100) + ")"
            }
        },

        NightBgStyle() {
            return {
                filter: "opacity(" + String(1 - this.time/100) + ")"
            }
        },

        DayBgStyle() {
            return {
                filter: "opacity(" + String(this.time/100) + ")"
            }
        },

        UmbrellaFade() {
            return {
                filter: "opacity(" + String(1 - this.time/70 < 0 ? 0 : 1 - this.time/70) + ")"
            }
        },

        CloudFade() {
            return {
                filter: "opacity(" + String(1 - this.time/70 < 0 ? 0 : 1 - this.time/70) + ")"
            }
        },

        
    }, 

    created() {
        left_val_init();
        this.GetRandomStyle();
        this.setTimer();
    },

    mounted() {
        
    },

    beforeMount() {
        //this.setTimer();
    }
});



function left_val_init() {
    //console.log("yse");
    let cur_pos = -5;
    left_value_arr = [];
    for(let i = 0; i < numCloud_const; i++) {
        //console.log(cur_pos, left_value_arr);
        left_value_arr.push(cur_pos + randomBetween(-2, 2));
        //console.log(left_value_arr);
        cur_pos += 100 / (numCloud_const-1);
    }
}

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}