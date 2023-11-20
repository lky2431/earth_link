
import * as Cesium from "cesium";
import firework from "./FireWork";
import playChristmasVideo from "./ChristmasVideo";
import snow from "./Snow";
import airplane from "./Airplane";
import visitTemple from "./VisitTemple";
import coding from "./Coding";

const content = {
    0: {
        image: "src/assets/post/man_coding.jpg",
        avatar: "mike",
        name: "mikelam2431",
        content: "I relish the opportunity to code on a Saturday afternoon, and I'm hopeful about my chances of success in the upcoming hackathon.",
        longitude: 114.10002169940539,
        latitude: 22.349990039432058,
        height: 155,
        viewAngle: new Cesium.HeadingPitchRange(Math.PI, -Math.PI / 8, 500),
        postAction: coding
    },
    1: {
        image: "src/assets/post/Sensō-ji.jpg",
        avatar: "oda",
        name: "odamoriko",
        content: "Just returned from an amazing visit to the Sensō-ji temple in Tokyo! 🙏 🙏🏻 🙏🏻🇯 🙏🏻🇯🇵 This historic temple is truly a sight to behold, with its stunning architecture and beautiful gardens. I felt so peaceful and at ease exploring the grounds, taking in the sights and sounds of this special place. 🌸 🌸🦋 If you ever find yourself in Tokyo, I highly recommend adding Sensō-ji to your must-see list! 📍 📍✨ #SensoJi #Tokyo #Japan #Temple #Travel #Explore #Peaceful #Garden #Architecture",
        longitude: 139.79665361717546,
        latitude: 35.714777117267154,
        height: 60,
        viewAngle: new Cesium.HeadingPitchRange(Math.PI, -Math.PI / 4, 200),
        postAction: visitTemple
    },
    2: {
        image: "src/assets/post/firework.jpg",
        avatar: "finn",
        name: "finnwallssss",
        content: "As I watch the fireworks light up the sky, I can't help but feel a sense of joy and awe. The colors, the sounds, the excitement - it's truly a magical experience.    #firework #sydney",
        longitude: 151.21550261020073,
        latitude: -33.85365550826243,
        height: 80,
        viewAngle: new Cesium.HeadingPitchRange(Math.PI, -Math.PI / 12, 500),
        postAction: (viewer) => {
            firework(viewer, Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(151.21550261020073, -33.85365550826243)
            ))
        }
    },
    3: {
        image: "src/assets/post/christmas.jpg",
        avatar: "vivian",
        name: "VivianaGolbahar",
        content: "Merry Christmas, everyone! 🎄 🎄🎅 🎄🎅🎁 I just wanted to share a video from our lovely Christmas party last night. 😍 I hope you all had a wonderful Christmas as well, and that you were able to spend time with the people you love. 💖 #MerryChristmas #Family #Love #ChristmasParty #Memories #Grateful",

        longitude: -118.40100669485228,
        latitude: 34.06482394388945,
        height: 40,
        viewAngle: new Cesium.HeadingPitchRange(Math.PI, -Math.PI / 8, 80),
        postAction: playChristmasVideo
    },
    4: {
        image: "src/assets/post/snow.jpg",
        avatar: "dylan",
        name: "dylanfossmarsson",
        content: "Winter has arrived ❄️❄️❄️ It's snowing outside and I'm trying to stay warm and cozy.",
        longitude: 10.75884334174948,
        latitude: 59.87705554881109,
        height: 63,
        viewAngle: new Cesium.HeadingPitchRange(Math.PI, -Math.PI / 8, 130),
        postAction: (viewer) => {
            snow(viewer, Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(10.75884334174948, 59.87705554881109)
            ))
        }
    },
    5: {
        image: "src/assets/post/airport.jpg",
        avatar: "dhruv",
        name: "dhruvgolla123",
        content: "Ready for an adventure! 🌄 🌄🦁 🌄🦁🛬 I'm thrilled6 to be heading to Africa from Mumbai today! 🇮 🇮🇳 🇮🇳🛫 I've always been fascinated by the diverse cultures and landscapes of this incredible continent, and I can't wait to experience it all firsthand. 🌟",
        longitude: 72.86299455103803,
        latitude: 19.090988056401397,
        height: 100,
        viewAngle: new Cesium.HeadingPitchRange(0, -Math.PI, 20000000),
        postAction: airplane
    },


}

export default content;