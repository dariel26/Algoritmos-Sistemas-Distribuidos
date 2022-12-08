export function getRandomColor(usedColors) {
    let notUsedColors = colors;
    let maxValue = 0;
    let minValue = 0;
    for (let i = 0; i < usedColors.length; i++) {
        notUsedColors = notUsedColors.filter((color) => (color !== usedColors[i]));
    }
    maxValue = notUsedColors.length;
    if (notUsedColors.length > 0) {
        return notUsedColors[parseInt(Math.random() * (maxValue - minValue) + minValue)]
    } else {
        return "transparent";
    }
}

const colors = [
    "#CD5C5C",
    "#F08080",
    "#E9967A",
    "#DC143C",
    "#B22222",
    "#8B0000",
    "#FF69B4",
    "#C71585",
    "#FF7F50",
    "#FF4500",
    "#FFA500",
    "#BDB76B",
    "#EE82EE",
    "#663399",
    "#6A5ACD",
    "#483D8B",
    "#800080",
    "#ADFF2F",
    "#3CB371",
    "#2E8B57",
    "#006400",
    "#808000",
    "#556B2F",
    "#20B2AA",
    "#008080",
    "#00FFFF",
    "#7FFFD4",
    "#5F9EA0",
    "#87CEEB",
    "#1E90FF",
    "#0000CD",
    "#191970",
    "#FFDEAD",
    "#DEB887",
    "#BC8F8F",
    "#DAA520",
    "#D2691E",
    "#800000",
];