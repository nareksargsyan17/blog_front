export default function checkTime(time) {
    if ((time / 1000 / 60 / 60 / 24 / 365) > 1 && (time / 1000 / 60 / 60 / 24 / 365) < 365) {
        return `${parseInt((time / 1000 / 60 / 60 / 24 / 365))} years`
    } else if ((time / 1000 / 60 / 60 / 24) > 1 && (time / 1000 / 60 / 60 / 24) < 24) {
        return `${parseInt((time / 1000 / 60 / 60 / 24))} days`
    } else if ((time / 1000 / 60 / 60) > 1 && (time / 1000 / 60 / 60) < 60) {
        return `${parseInt((time / 1000 / 60 / 60))} hours`
    } else if ((time / 1000 / 60) > 1 && (time / 1000 / 60) < 60) {
        return `${parseInt((time / 1000 / 60))} minutes`
    } else if ((time / 1000) > 1 && (time / 1000) < 60) {
        return `${parseInt((time / 1000))} seconds`
    } else if (time < 1000) {
        return `${1} second`
    }
}