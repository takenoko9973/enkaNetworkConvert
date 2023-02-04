import { artifactsIcon2Text, createTextInArtifact } from "./artifacts";
import { createTextInWeapon, weaponOPIcon2Text } from "./weapon";
import { createTextInFriend, friendIcon2Text } from "./friend";


export function createConvertTextElements() {
    createTextInFriend();
    createTextInWeapon();
    createTextInArtifact();
}


export function enkaIcon2Text() {
    weaponOPIcon2Text();
    artifactsIcon2Text();
    friendIcon2Text();
}
