import {
  createC2pa,
  createL2ManifestStore,
  generateVerifyUrl,
} from "@c2pa/adobe-sdk";
import wasmSrc from "@c2pa/adobe-sdk/assets/wasm/toolkit_bg.wasm?url";
import workerSrc from "@c2pa/adobe-sdk/worker.min.js?url";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import bounce from "./assets/bounce-sprite.png";
import buildings from "./assets/buildings.png";
import cat from "./assets/cat.png";
import contact from "./assets/contact.png";
import cr from "./assets/cr.png";
import newCreddy from "./assets/credddy-new.png";
import creddycontrol from "./assets/creddy+controls.png";
import creddyIdle from "./assets/creddy-idle0.png";
import creddy from "./assets/creddy.png";
import hiContact from "./assets/hi-contact.png";
import hiPalette from "./assets/hi-palette.png";
import hiPhone from "./assets/hi-phone.png";
import hiWand from "./assets/hi-wand.png";
import overlay from "./assets/overlay.png";
import palette from "./assets/palette.png";
import phone from "./assets/phone.png";
import platform from "./assets/platform6.png";
import sky from "./assets/sky.png";
import SmallTallPlatform from "./assets/smallTall.png";
import startPage from "./assets/startPage.png";
import trees from "./assets/trees2.png";
import wand from "./assets/wand.png";
import "./style.css";
// const combinedConfig = {
//   global: {
//     wasmSrc: "./dist/assets/wasm/toolkit_bg.wasm",
//     workerSrc: "./dist/c2pa.worker.umd.js",
//     connectedAccounts: {
//       host: "https://cai-identity-mock.adobe.io",
//       apiKey: "c2pa-js-test",
//     },
//     claimsSigner: {
//       host: "https://cai-stage.adobe.io",
//       apiKey: "cai-desktop-helper",
//     },
//     manifestStorage: {
//       post: {
//         host: "https://cai-msb-stage.adobe.io",
//         apiKey: "cai-desktop-helper",
//       },
//       get: {
//         host: "https://cai-manifests-stage.adobe.com",
//       },
//     },
//     thumbnail: {
//       maxSize: 800,
//       quality: 60,
//     },
//   },
//   sign: {
//     authToken:
//       "eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEtc3RnMS1rZXktYXQtMS5jZXIiLCJraWQiOiJpbXNfbmExLXN0ZzEta2V5LWF0LTEiLCJpdHQiOiJhdCJ9.eyJpZCI6IjE2OTk1NzY3NTI3MDhfNjAyOWQ4MWUtYjEwNi00MjIxLWJlMDgtZWU3OGI3Y2RmY2NjX3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJhZG9iZWRvdGNvbTIiLCJ1c2VyX2lkIjoiQzY4MjM3QjA2MjU0QzE0QTBBNDk0MjFBQGM2MmYyNGNjNWI1YjdlMGUwYTQ5NDAwNCIsImFzIjoiaW1zLW5hMS1zdGcxIiwiYWFfaWQiOiJDNjgyMzdCMDYyNTRDMTRBMEE0OTQyMUFAYzYyZjI0Y2M1YjViN2UwZTBhNDk0MDA0IiwiY3RwIjowLCJmZyI6Ilg1NEdQUTRXN1o2N0E2RFozR1pNQzJJQTJJPT09PT09Iiwic2lkIjoiMTY5OTU3NjQwNTExM18zYTkxYWMyOC1mNjQ2LTRkYzYtYmI1OS05YTc3MzVlNDdjYmFfdWUxIiwibW9pIjoiZTQ1NzJmNGMiLCJwYmEiOiJMb3dTZWMiLCJleHBpcmVzX2luIjoiMzYwMDAwMCIsInNjb3BlIjoiQWRvYmVJRCxvcGVuaWQsZ25hdixyZWFkX29yZ2FuaXphdGlvbnMsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0LGFkZGl0aW9uYWxfaW5mby5yb2xlcyIsImNyZWF0ZWRfYXQiOiIxNjk5NTc2NzUyNzA4In0.a6JPr7Xk9uixyLSmR5C_c6Awyht6icAfZI6BaToOOGqS_iyTna5QJtAUuBYzeQa5s_7I-2hQO7lYtZm3REFuW-GIUZuDUo4Uu9WhyTiYZrAq3YQcPbUZ0N2ga5v4i4k0CpTLz1BmGzw2kKHz22ZAsMQeU1f8Cu8EXXWhNHI-fxhaYVIgHlawt9NtFH68u70xmMBT2GujP4SAECL9Krf3F85LKxugPZXAVC1lzYXNY1KaRtRzysqZ0If1Jir-0DYrafXYl0kN2ZlRugx9PinKpuc_3INQyEltchKG4rqcw7mZBmLogCS91OrMmeXiajoB-NpQMYOv7FVaYiHCd0PEEQ",
//     storageLocations: ["embedded"],
//   },
//   reserveSize: 32768,
// };

const CLAIMS_SIGNER_API_URL_STAGE = "https://cai-stage.adobe.io";

const MANIFEST_STORAGE_POST_API_URL_STAGE = "https://cai-msb-stage.adobe.io";

const MANIFEST_STORAGE_GET_API_URL_STAGE =
  "https://cai-manifests-stage.adobe.com";

const c2paConfig = {
  wasmSrc,
  workerSrc,
  claimsSigner: {
    host: CLAIMS_SIGNER_API_URL_STAGE,
    apiKey: "clio-playground-web",
    reserveSizeCacheMs: 3600 * 1000,
  },
  manifestStorage: {
    post: {
      host: MANIFEST_STORAGE_POST_API_URL_STAGE,
      apiKey: "clio-playground-web",
    },
    get: {
      host: MANIFEST_STORAGE_GET_API_URL_STAGE,
    },
  },
  signTimeoutMs: 10 * 1000,
  thumbnail: {
    maxSize: 800,
    quality: 60,
  },
};

let getImageData = false;
let imgData;
let base64;
let pictureShown = false;
const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");
let pause = true;
let phoneSelected = false;
let wandSelected = false;
let contactSelected = false;
let paletteSelected = false;
c.imageSmoothingEnabled = false;

const gravity = 1.5;
class Player {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.speed = 4;
    this.width = 145;
    this.height = 87;
    this.heightRun = 183;
    this.image = createImage(creddyIdle);
    this.frames = [
      104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104,
      104, 104, 104, 104, 104, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
      118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 131, 131, 131, 131, 131,
      131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131, 131,
      110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110,
      110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110,
      110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110,
      110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110,
    ];
    let sum = 0;
    this.placement = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 104, 104,
      104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104,
      104, 104, 222, 222, 222, 222, 222, 222, 222, 222, 222, 222, 222, 222, 222,
      222, 222, 222, 222, 222, 222, 222, 353, 353, 353, 353, 353, 353, 353, 353,
      353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 353, 463, 463, 463,
      463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463, 463,
      463, 463, 573, 573, 573, 573, 573, 573, 573, 573, 573, 573, 573, 573, 573,
      573, 573, 573, 573, 573, 573, 573,
    ];
    this.framesRun = [
      124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124,
      124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124,
      124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124,
      124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124,
      141, 141, 141, 141, 141, 141, 141, 141, 141, 141, 141, 141, 141, 141, 141,
      141, 141, 141, 141, 141, 141, 113, 113, 113, 113, 113, 113, 113, 113, 113,
      113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 119, 119, 119,
      119, 119, 119, 119, 119, 119, 119, 119, 119, 119, 119, 119, 119, 119, 119,
      119, 119, 168, 168, 168, 168, 168168, 168, 168, 168, 168, 168, 168, 168,
      168, 168168, 168, 168, 168, 168,
    ];
    this.placementRun = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 124, 124,
      124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124,
      124, 124, 248, 248, 248, 248, 248, 248, 248, 248, 248, 248, 248, 248, 248,
      248, 248, 248, 248, 248, 248, 248, 372, 372, 372, 372, 372, 372, 372, 372,
      372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 372, 513, 513, 513,
      513, 513, 513, 513, 513, 513, 513, 513, 513, 513, 513, 513, 513, 513, 513,
      513, 513, 626, 626, 626, 626, 626, 626, 626, 626, 626, 626, 626, 626, 626,
      626, 626, 626, 626, 626, 626, 626, 745, 745, 745, 745, 745, 745, 745, 745,
      745, 745, 745, 745, 745, 745, 745, 745, 745, 745, 745, 745,
    ];
    this.value = 0;
    this.valueRun = 0;
    this.sprites = {
      run: {
        image: createImage(bounce),
        placement: this.placementRun,
        frames: this.framesRun,
        height: this.heightRun,
        value: this.valueRun,
      },
      stand: {
        image: createImage(creddyIdle),
        placement: this.placement,
        frames: this.frames,
        value: this.value,
        height: this.height,
      },
    };

    this.currentSprint = this.sprites.stand;
  }
  draw() {
    c.drawImage(
      this.currentSprint.image,
      this.placement[this.value],
      0,
      this.frames[this.value],
      87,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    this.value++;
    console.log("placement", this.placement);
    console.log("frame", this.frames);
    if (this.value > 119) {
      this.value = 0;
    }

    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
    }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
class ClickableObject {
  constructor({ x, y, image, hiImage, original }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.hiImage = hiImage;
    this.original = original;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  image.style.height = "125px";
  image.style.width = "525px";
  return image;
}

let platformImage = createImage(platform);
let player = new Player();
let platforms = [];
let clickableObjects1 = [];
let clickableObjects2 = [];
let clickableObjects3 = [];
let clickableObjects4 = [];
let genericObjects = [];
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  enter: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

let scrollOffset = 0;
let c2pa;
let picCtx;
let pic;
let manifest;
async function init() {
  c2pa = await createC2pa(c2paConfig).catch((err) => {
    console.log(err);
  });
  console.log(c2pa);
  manifest = c2pa.createManifest({
    claim_generator: "my-app/1.0",
    title: "test title",
    format: "image/png",
    assertions: [
      {
        label: "c2pa.actions",
        data: {
          actions: [
            {
              action: "c2pa.edited",
            },
          ],
        },
      },
      {
        label: "com.adobe.generative-ai",
        data: {
          description: "Adobe Clio",
          version: "1.0.0",
        },
      },
    ],
  });
  platformImage = createImage(platform);
  player = new Player();
  platforms = [
    new Platform({
      x: platformImage.width * 4 + 573,
      y: 295,
      image: createImage(SmallTallPlatform),
    }),
    new Platform({ x: -12, y: 510, image: platformImage }),
    new Platform({
      x: platformImage.width + 100,
      y: 510,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 510,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 200,
      y: 510,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 299,
      y: 510,
      image: platformImage,
    }),

    new Platform({
      x: platformImage.width * 5 + 450,
      y: 510,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 6 + 400,
      y: 510,
      image: platformImage,
    }),
  ];

  genericObjects = [
    new GenericObject({ x: -10, y: -150, image: createImage(sky) }),
    new GenericObject({ x: 0, y: -30, image: createImage(buildings) }),
    new GenericObject({ x: 0, y: 200, image: createImage(trees) }),
  ];

  clickableObjects1 = [
    new ClickableObject({
      x: 800,
      y: 430,
      image: createImage(phone),
      hiImage: createImage(hiPhone),
      original: createImage(phone),
    }),
  ];
  clickableObjects2 = [
    new ClickableObject({
      x: 1510,
      y: 430,
      image: createImage(wand),
      hiImage: createImage(hiWand),
      original: createImage(wand),
    }),
  ];
  clickableObjects3 = [
    new ClickableObject({
      x: 2300,
      y: 430,
      image: createImage(contact),
      hiImage: createImage(hiContact),
      original: createImage(contact),
    }),
  ];
  clickableObjects4 = [
    new ClickableObject({
      x: 3400,
      y: 430,
      image: createImage(palette),
      hiImage: createImage(hiPalette),
      original: createImage(palette),
    }),
  ];

  scrollOffset = 0;
}
async function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "#FFFAF0";
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObjects) => {
    genericObjects.draw();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });
  clickableObjects1.forEach((clickableObject) => {
    clickableObject.draw();
  });
  clickableObjects2.forEach((clickableObject) => {
    clickableObject.draw();
  });
  clickableObjects3.forEach((clickableObject) => {
    clickableObject.draw();
  });
  clickableObjects4.forEach((clickableObject) => {
    clickableObject.draw();
  });
  if (!pause) {
    player.update();
    if (keys.right.pressed && player.position.x < 400) {
      player.velocity.x = player.speed;
    } else if (
      (keys.left.pressed && player.position.x > 100) ||
      (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
    ) {
      player.velocity.x = -player.speed;
    } else {
      player.velocity.x = 0;

      if (keys.right.pressed) {
        scrollOffset += player.speed;
        platforms.forEach((platform) => {
          platform.position.x -= player.speed;
        });
        clickableObjects1.forEach((clickableObject) => {
          clickableObject.position.x -= player.speed;
        });
        clickableObjects2.forEach((clickableObject) => {
          clickableObject.position.x -= player.speed;
        });
        clickableObjects3.forEach((clickableObject) => {
          clickableObject.position.x -= player.speed;
        });
        clickableObjects4.forEach((clickableObject) => {
          clickableObject.position.x -= player.speed;
        });
        genericObjects.forEach((genericObject) => {
          genericObject.position.x -= player.speed * 0.66;
        });
      } else if (keys.left.pressed && scrollOffset > 0) {
        scrollOffset -= player.speed;
        platforms.forEach((platform) => {
          platform.position.x += player.speed;
        });
        clickableObjects1.forEach((clickableObject) => {
          clickableObject.position.x += player.speed;
        });
        clickableObjects2.forEach((clickableObject) => {
          clickableObject.position.x += player.speed;
        });
        clickableObjects3.forEach((clickableObject) => {
          clickableObject.position.x += player.speed;
        });
        clickableObjects4.forEach((clickableObject) => {
          clickableObject.position.x += player.speed;
        });
        genericObjects.forEach((genericObject) => {
          genericObject.position.x += player.speed;
        });
      }
    }

    platforms.forEach((platform) => {
      if (
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >=
          platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x + player.width <= platform.position.x + platform.width
      ) {
        player.velocity.y = 0;
      }
    });
    clickableObjects1.forEach(async (clickableObject, index) => {
      if (
        player.position.x >= clickableObject.position.x - 100 &&
        player.position.x <=
          clickableObject.position.x + clickableObject.width + 100
      ) {
        document.getElementById("caption1").style.display = "flex";
        clickableObject.image = clickableObject.hiImage;
        clickableObject.position.y = 410;
        if (!base64) {
          document.getElementById("caption1").innerHTML = "Press Enter";
        }

        if (keys.enter.pressed) {
          document.querySelector("#renderer").style.display = "block";
          document.getElementById("3js-overlay").style.display = "block";
        }
        if (keys.space.pressed && !base64) {
          capture();
          setTimeout(() => {
            console.log("Delayed for 1 second.");
          }, 1000);
          if (base64 != undefined) {
            // try {
            //   const { embeddedAsset } = await c2pa.sign(base64, manifest, {
            //     authToken:
            //       "eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEtc3RnMS1rZXktYXQtMS5jZXIiLCJraWQiOiJpbXNfbmExLXN0ZzEta2V5LWF0LTEiLCJpdHQiOiJhdCJ9.eyJpZCI6IjE2OTk1ODA0OTE1NDZfZmE0MzA5NGYtY2M5NS00NTQ5LTk0MTctN2UyOTU0NjQ0NWM0X3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJDQ0hvbWVXZWIxIiwidXNlcl9pZCI6IkM2ODIzN0IwNjI1NEMxNEEwQTQ5NDIxQUBjNjJmMjRjYzViNWI3ZTBlMGE0OTQwMDQiLCJhcyI6Imltcy1uYTEtc3RnMSIsImFhX2lkIjoiQzY4MjM3QjA2MjU0QzE0QTBBNDk0MjFBQGM2MmYyNGNjNWI1YjdlMGUwYTQ5NDAwNCIsImN0cCI6MCwiZmciOiJYNTRLTFE0VzdaNjdBNkRaM0daTUMySUEyST09PT09PSIsInNpZCI6IjE2OTk1NzY0MDUxMTNfM2E5MWFjMjgtZjY0Ni00ZGM2LWJiNTktOWE3NzM1ZTQ3Y2JhX3VlMSIsIm1vaSI6Ijc1ZGVlYWMwIiwicGJhIjoiTWVkU2VjTm9FVixMb3dTZWMiLCJleHBpcmVzX2luIjoiODY0MDAwMDAiLCJzY29wZSI6IkFkb2JlSUQsb3BlbmlkLGduYXYscmVhZF9vcmdhbml6YXRpb25zLGNyZWF0aXZlX3NkayxhZGRpdGlvbmFsX2luZm8ub3B0aW9uYWxBZ3JlZW1lbnRzLGFkZGl0aW9uYWxfaW5mby5zY3JlZW5fbmFtZSxhZGRpdGlvbmFsX2luZm8ucm9sZXMsdGtfcGxhdGZvcm0scGlpcF9yZWFkLHRrX3BsYXRmb3JtX3N5bmMsYWZfYnlvZiIsImNyZWF0ZWRfYXQiOiIxNjk5NTgwNDkxNTQ2In0.I_E1UAYPVcdj8G2strSY-X41y7bzaCH1aPskV6FwrcqUnpYkcaEdJZiopjfudKHypPXnl23F2rk2xmu9icphdEa9v9R_iMgsefpXLrK1pvgWCwe4SlKVCLMLdeIzsW_Q8hMBqO8IRteDRrPsLRmqdpwdbynNXJgWYTTkowXo9pQH_pHUWE1WZJE06cwROcvoIqdRa0f6Ub___lwXX5HHFYZNck1tyA80p1ebDqfivc3B5pdzzkR0sTdvCGaepifFAJbQl8zt0180dkGpEZNRlFG_qg-eseslMolxYooD9-RMPYe7Ix9HnbKT7baxh4b1Obx8LHxhgaP2yRF5LJ9RIg",
            //     storageLocations: ["cloud", "embedded"],
            //   });
            //   return embeddedAsset;
            // } catch (err) {
            //   console.log(err);
            // }

            // // Read the claim
            // const readResult = await c2pa.read(embeddedAsset);
            // console.log(readResult);
            document.querySelector("#renderer").style.display = "none";
            document.getElementById("3js-overlay").style.display = "none";
            document.getElementById("caption1").innerHTML =
              "Beautiful! Since the phone is C2PA-enabled your information was  stored in the image on capture ";
            console.log("base64", base64);

            let base64Img = new Image();

            pic = document.querySelector("#picture");
            picCtx = pic.getContext("2d");

            base64Img.onload = function () {
              picCtx.drawImage(base64Img, 0, 0, 306, 194);
            };
            base64Img.src = base64;
            document.querySelector("#picture-underlay").style.visibility =
              "visible";
            pictureShown = true;
          }
        }

        phoneSelected = true;
      } else if (
        player.position.x >
          clickableObject.position.x + clickableObject.width + 100 ||
        player.position.x < clickableObject.position.x - 100
      ) {
        clickableObject.image = clickableObject.original;
        clickableObject.position.y = 430;
        if (phoneSelected) {
          document.getElementById("caption1").innerHTML =
            "You are an awesome photographer! Now we want to add a cat into the image - go ahead and click the AI wand";
          document.querySelector("#picture-underlay").style.visibility =
            "hidden";
        }
      }
    });
    clickableObjects2.forEach((clickableObject, index) => {
      if (
        player.position.x >= clickableObject.position.x - 100 &&
        player.position.x <=
          clickableObject.position.x + clickableObject.width + 100
      ) {
        document.getElementById("caption1").style.display = "flex";
        document.getElementById("caption1").innerHTML = "Press Enter";
        clickableObject.image = clickableObject.hiImage;
        clickableObject.position.y = 410;

        if (keys.enter.pressed) {
          let catPic = createImage(cat);
          picCtx.drawImage(catPic, 50, 0);
          document.getElementById("ai").style.display = "block";

          wandSelected = true;
        }
        if (wandSelected) {
          document.getElementById("caption1").style.display = "none";
        }

        document.querySelector("#picture-underlay").style.visibility =
          "visible";
      } else if (
        player.position.x >
          clickableObject.position.x + clickableObject.width + 100 ||
        player.position.x < clickableObject.position.x - 100
      ) {
        clickableObject.image = clickableObject.original;
        clickableObject.position.y = 430;
        if (wandSelected) {
          document.getElementById("caption1").style.display = "flex";
          document.getElementById("caption1").innerHTML =
            "Now , find the address book to add your social media account to the image";
        }
      }
    });
    clickableObjects3.forEach((clickableObject, index) => {
      if (
        player.position.x >= clickableObject.position.x - 100 &&
        player.position.x <=
          clickableObject.position.x + clickableObject.width + 100
      ) {
        document.getElementById("caption1").style.display = "flex";

        clickableObject.image = clickableObject.hiImage;
        clickableObject.position.y = 410;
        document.getElementById("caption1").innerHTML = "Press Enter";
        if (keys.enter.pressed) {
          document.querySelector("#picture-underlay").style.display = "none";
          document.querySelector("#insta-underlay").style.display = "flex";
          contactSelected = true;
        }
        if (contactSelected) {
          document.getElementById("caption1").style.display = "none";
        }
      } else if (
        player.position.x >
          clickableObject.position.x + clickableObject.width + 100 ||
        player.position.x < clickableObject.position.x - 100
      ) {
        clickableObject.image = clickableObject.original;
        clickableObject.position.y = 430;
        if (contactSelected) {
          document.getElementById("caption1").style.display = "flex";
          document.getElementById("caption1").innerHTML =
            "Let's finish off by color grading our image , find the color palette to continue";
        }
      }
    });
    clickableObjects4.forEach((clickableObject, index) => {
      if (
        player.position.x >= clickableObject.position.x - 100 &&
        player.position.x <=
          clickableObject.position.x + clickableObject.width + 100
      ) {
        document.getElementById("caption1").style.display = "flex";
        console.log("allo");
        clickableObject.image = clickableObject.hiImage;
        clickableObject.position.y = 410;
        function drawColor() {
          // draw color
          picCtx.globalAlpha = 0.1;
          picCtx.drawImage(createImage(overlay), 0, 0);
          paletteSelected = true;
          // draw image
        }
        if (keys.enter.pressed) {
          drawColor();
          document.getElementById("edit").style.display = "block";
          document.getElementById("subtitle").style.display = "none";
          document.getElementById("final-pic").src = pic.toDataURL();
          document.getElementById("final-pic").style.display = "block";

          document.getElementById("username-div2").className = "username-div3";
          document.getElementById("overlay").style.backgroundColor =
            "rgba(40, 40, 40, 0.50)";
          document.getElementById("view").style.display = "block";
        }
        document.querySelector("#picture-underlay").style.visibility =
          "visible";
        document.getElementById("caption1").innerHTML = "Press Enter";
        if (paletteSelected) {
          document.querySelector("#picture-underlay").style.visibility =
            "hidden";
          document.getElementById("caption1").innerHTML =
            "Congratulations! Your image now has Content Credentials included and is ready to share!";
        }
      } else if (
        player.position.x >
          clickableObject.position.x + clickableObject.width + 100 ||
        player.position.x < clickableObject.position.x - 100
      ) {
        clickableObject.image = clickableObject.original;
        clickableObject.position.y = 430;
        if (paletteSelected) {
          document.querySelector("#picture-underlay").style.visibility =
            "hidden";
          document.getElementById("caption1").innerHTML =
            "Congratulations! Your image now has Content Credentials included and is ready to share!";
        }
      }
    });
    //win condition
    if (scrollOffset > 2000) {
      console.log("you win");
    }

    //lose condition
    if (player.position.y > canvas.height) {
      console.log("you lose");
      init();
    }
  }
}
init();
animate();

//EVENT LISTENERS

window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 37:
      keys.left.pressed = true;
      break;
    case 40:
      break;
    case 39:
      keys.right.pressed = true;
      break;
    case 38:
      player.velocity.y -= 25;
      break;
    case 13:
      keys.enter.pressed = true;
      console.log("enter");
      break;
    case 32:
      keys.space.pressed = true;
      console.log("space");
      break;
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 37:
      keys.left.pressed = false;
      break;
    case 40:
      break;
    case 39:
      keys.right.pressed = false;
      break;
    case 38:
      break;
    case 13:
      keys.enter.pressed = false;
      break;
  }
});

//UI

function getUserName() {
  var nameField = document.getElementById("nameField").value;
  var result = document.getElementById("username");

  if (nameField.length > 0) {
    result.textContent = nameField;
    document.querySelector("#right").style.display = "flex";
    document.querySelector("#bottom").style.display = "flex";
    document.querySelector("#small-overlay").style.display = "none";
    document.querySelector("#overlay").style.backgroundColor = "transparent";
    pause = false;
  } else {
    document.getElementById("nameField").style.borderBottom =
      "4px solid #E66363";
  }
}

function getInsta() {
  var nameField = document.getElementById("instaField").value;
  var result = document.getElementById("link");

  if (nameField.length > 0) {
    result.textContent = nameField;
    document.getElementById("insta").style.display = "block";
    document.querySelector("#insta-underlay").style.display = "none";
    document.querySelector("#picture-underlay").style.display = "flex";
    document.querySelector("#picture-underlay").style.visibility = "hidden";
  }
}
var subButton = document.getElementById("cr-btn");
subButton.addEventListener("click", getUserName, false);

var instaButton = document.getElementById("insta-btn");
instaButton.addEventListener("click", getInsta, false);

const scene = new THREE.Scene();
console.log(scene);

// Camera Setup
const fov = 35;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 25);
scene.add(camera);

// Render Setup
const renderer = new THREE.WebGLRenderer({});
renderer.domElement.setAttribute("id", "renderer");
document.querySelector("#container").appendChild(renderer.domElement);

renderer.setSize(1024, 576);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor = (0x000000, 0.0);
console.log(renderer);

// Adding orbit controls
let controls = new OrbitControls(camera, renderer.domElement);

controls.minDistance = 10;
controls.maxDistance = 40;

// loader for loading texture
let loader = new THREE.TextureLoader();

// array for holding all texutre
let textureArray = [];

// all texture
let frontTexture = loader.load("/sky/skybox-4.jpg");
let backTexture = loader.load("/sky/skybox-2.jpg");
let topTexture = loader.load("/sky/skybox-5.jpg");
let bottomTexture = loader.load("/sky/skybox-6.jpg");
let rightTexture = loader.load("/sky/skybox-3.jpg");
let leftTexture = loader.load("/sky/skybox-1.jpg");

textureArray.push(new THREE.MeshBasicMaterial({ map: frontTexture }));
textureArray.push(new THREE.MeshBasicMaterial({ map: backTexture }));
textureArray.push(new THREE.MeshBasicMaterial({ map: topTexture }));
textureArray.push(new THREE.MeshBasicMaterial({ map: bottomTexture }));
textureArray.push(new THREE.MeshBasicMaterial({ map: rightTexture }));
textureArray.push(new THREE.MeshBasicMaterial({ map: leftTexture }));

for (let i = 0; i < textureArray.length; i++) {
  textureArray[i].side = THREE.BackSide;
}

// making cube
const cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
const skyBox = new THREE.Mesh(cubeGeometry, textureArray);
scene.add(skyBox);

// render function to render the scene
const render = () => {
  renderer.render(scene, camera);
};
const capture = () => {
  requestAnimationFrame(animateThree);
  render();
  const cav = document.querySelector("#renderer");
  base64 = cav.toDataURL("img/png");
};
// Recursion function for animation
const animateThree = () => {
  requestAnimationFrame(animateThree);
  render();
};
animateThree();
document.querySelector("#renderer").style.display = "none";
document.getElementById("start-page").style.backgroundImage = startPage;
//INTRO
document.querySelector("#start-btn").addEventListener("click", () => {
  document.querySelector("#page-1").style.display = "flex";
  document.querySelector("#start-page").style.display = "none";
});
document.querySelector("#page1-btn").addEventListener("click", () => {
  document.querySelector("#page-2").style.display = "flex";
  document.querySelector("#page-1").style.display = "none";
});
document.querySelector("#page2-btn").addEventListener("click", () => {
  document.querySelector("#page-3").style.display = "flex";
  document.querySelector("#page-2").style.display = "none";
});
document.querySelector("#page3-btn").addEventListener("click", () => {
  document.querySelector("#container").style.display = "block";
  document.querySelector("#page-3").style.display = "none";
});
document.querySelector("#img").src = creddycontrol;
document.querySelector("#creddy").src = newCreddy;
document.querySelector("#cr-logo").src = cr;
