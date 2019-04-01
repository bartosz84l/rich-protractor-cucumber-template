
export const testConfig = {

    baseUrl: process.env.baseUrl || "https://ristretto.wildmoka.com/backoffice/",
    username: process.env.username || "jerome+testarmyauto@wildmoka.com",
    password: process.env.password || "YA7twULpJNML",
    streamUrl: process.env.streamUrl || "rtmp://localhost:3935/live/big_buck_bunny_480p",
    destinations: {
        youtube: "Kamila Menes",
        FacebookPageWroclaw: "10cloudsqa",
        FacebookProfileWroclaw: "Testujc Testuj",
        Twitter: "WacekNoga",
    },
    testFirstName: "Wildmoka",
    testLastName: "Test",
    testEmailPrefix: "wildmoka.test+",
    testEmailDomain: "@gmail.com",
    testEmailPassword: "1234abcd!",

    facebookWroclaw: {
        email: "testuj123c@gmail.com",
        FbPassword: "Testuj123"
    },
    decors: {
        png: "test-army-logo-wroclaw--327",
        text: "Lorem Ipsum is simply dummy text.",
        jpg: "cats",
    },
    animationTitle: "TEST ANIMATION ",
    clipTitle: "TEST CLIP ",
    clipInformation: "Clip published.",
    reelTitle: "TEST REEL ",
    templateTitle: "TEST TEMPLATE ",
    eventTitle: "TEST EVENT ",
    socialAccount: {
        facebookAccount: {
            name: "facebook",
            emailDetails: "testowytest37@gmail.com",
            passwordDetails: "Testuj123",
            profileName: "Krystyna Testowa"
        },
        twitterAccount: {
            name: "twitter",
            emailDetails: "testuj123c@gmail.com",
            passwordDetails: "Testuj123",
            profileName: "WacekNoga"
        },
        youTubeAccount: {
            name: "youtube",
            emailDetails: "wildmoka.test@gmail.com",
            passwordDetails: "1234abcd!",
            profileName: "Wildmoka Test"
        },
    },
}

