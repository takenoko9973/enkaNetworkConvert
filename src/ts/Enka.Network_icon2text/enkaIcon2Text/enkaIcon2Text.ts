import { createTextInWeapon, weaponOPIcon2Text } from "./weapon";
import { createTextInFriend, friendIcon2Text } from "./friend";


export function createConvertTextElements() {
    createTextInFriend();
    createTextInWeapon();
}


export function enkaIcon2Text() {
    weaponOPIcon2Text();
    friendIcon2Text();
}
