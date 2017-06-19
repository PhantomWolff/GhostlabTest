import "babel-polyfill";
import {
    externals
} from "MPageFusion";
import FusionCalendar from "fusion-calendar";

const calendar = new externals.FusionCalendar.FormCalendar({
    options: {
        inputType: "datetime"
    }
});
calendar.mount("root");
calendar.update();
