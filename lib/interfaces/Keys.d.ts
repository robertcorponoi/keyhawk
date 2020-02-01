/**
 * Describes the structure of the object that defines the keys that can be used for keybinds.
 */
export default interface Keys {
    /**
     * The normalized name of the key as the value and the value for the key from the event object
     * as the value.
     */
    [key: string]: string;
}
