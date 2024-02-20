class ImageCollection {
    images = [];

    /**
     * @param {Image[]} images
     */
    constructor(images) {
        this.images = images;
    }

    /**
     * @param {Image[]} images
     */
    set add(images) {
        if (Array.isArray(images)) {
            this.images.concat(toString(images));
        }
        this.images.push(toString(images));
    }

    search(name = "", tags = []) {
        if (name.length == 0 && tags.length == 0) {
            return []
        }

        if (name.length > 0 && tags.length == 0) {
            return this.images.filter((image) => {
                return image.name == name;
            });
        }

        if (name.length == 0 && tags.length > 0) {

        }
        if (name.length > 0 && tags.length > 0) { }
    }
}

class Image {
    name = "";
    tags = [];
    
    #size_big_suffux = "-big";

    /**
     * @param {string} name
     * @param {string[]} tags
     */
    constructor(name, tags) {
        this.name = name;
        this.tags = tags;
    }

    /**
     * @param {string[]} tags
     */
    set addTags(tags) {
        if (Array.isArray(tags)) {
            this.tags.concat(toString(tags));
        }
        this.tags.push(toString(tags));
    }
}