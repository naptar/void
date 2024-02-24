class VoidImageCollection {
    images = [];

    /**
     * @param {Image[]} images
     */
    add(images) {
        if (!this.images) this.images = []

        if (Array.isArray(images)) {
            this.images = this.images.concat(images);
            return;
        }

        this.images.push(toString(images));
    }

    search(name = "", tags = []) {
        if (name.length == 0 && tags.length == 0) {
            return []
        }

        if (name.length > 0 && tags.length == 0) {
            return this.searchByName(name);
        }

        if (name.length == 0 && tags.length > 0) {
            return this.searchByTags(tags);
        }

        if (name.length > 0 && tags.length > 0) {
            return this.searchByNameAndTags(name, tags);
        }
    }

    searchByName(name) {
        return this.images.filter((image) => {
            return image.name == name;
        });
    }

    searchByTags(tags) {
        return this.images.filter((image) => {
            var hasTags = true;
            tags.forEach((imgTag) => {
                var found = false;
                image.tags.forEach((tag) => {
                    if (tag == imgTag) found = true;
                });
                if (!found) hasTags = false;
            });
            return hasTags;
        });
    }

    searchByNameAndTags(name, tags) {
        return new VoidImageCollection(this.searchByName(name))
            .searchByTags(tags);
    }
}

class VoidImage {
    name = "";
    tags = [];
    image_dir = "res/img/";
    image_ext = ".png";
    image_type_default = "normal";
    image_type_current = this.image_type_default;
    image_types = [
        {
            "name": "normal",
            "suffix": ""
        },
        {
            "name": "big",
            "suffix": "-big"
        }
    ];
    
    /**
     * @param {string} name
     * @param {string[]} tags
     */
    constructor(name, tags = []) {
        if (!name) throw "why u make no name???";
        this.name = name;
        this.tags = tags;
    }

    /**
     * @param {string[]} tags
     */
    addTags(tags) {
        if (!this.tags) this.tags = [];

        if (Array.isArray(tags)) {
            this.tags.concat(tags);
            return;
        }

        this.tags.push(toString(tags));
    }

    setCurrentType(type) {
        if (!type) return;

    }

    getImgElement() {
        var img = document.createElement('img');
        var imgProps = this.getImageTypeProperties(this.image_type_current);
        img.src = this.getImageCurrentTypeDir() + this.name + imgProps["suffix"] + this.image_ext;
        return img;
    }

    getImageCurrentTypeDir() {
        return this.image_dir + "/" + this.image_type_current + "/";
    }

    getImageTypeProperties(type) {
        if (!type) return null;

        return this.image_types.filter((imageType) => {
            return imageType["name"] == type;
        });
    }
}

window.addEventListener('load', function () {
    var imageCollection = new VoidImageCollection();
    imageCollection.add(new VoidImage(window.voidImageList));
    window.voidImageCollection = imageCollection;

    var div = document.getElementById("images");

    imageCollection.images.forEach((image) => {
        div.appendChild(image.getImgElement());
    });
});