class VoidImageCollection {
    images = [];

    /**
     * @param {Image[]} images
     */
    add(images) {
        if (!this.images) this.images = []

        if (Array.isArray(images)) {
            images.forEach((image) => {
                this.addSingleImage(image);
            });
            return;
        }

        this.addSingleImage(images);
    }

    addSingleImage(image) {
        if (typeof image != 'object') throw "tried to add a non-object to image list";
        this.images.push(image);
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
            return image.name.toLowerCase().includes(name.toLowerCase());
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
    image_dir = "res/img/furni/";
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
        return this.image_dir + this.image_type_current + "/";
    }

    getImageTypeProperties(type) {
        if (!type) return null;

        var typeProps = this.image_types.filter((imageType) => {
            return imageType["name"] == type;
        });

        if (!typeProps || typeProps.length == 0) return null;

        return typeProps[0];
    }
}

window.addEventListener('load', function () {
    var imageCollection = new VoidImageCollection();

    this.window.voidImageList.forEach((voidImage) => {
        imageCollection.add(new VoidImage(voidImage));
    });

    window.voidImageCollection = imageCollection;

    var div = document.getElementById("images");
    var searchBox = document.getElementById("searchBox");

    var searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', function () {
        div.innerHTML = "";
        imageCollection.searchByName(searchBox.value).forEach((image) => {
            div.appendChild(image.getImgElement());
        });
    });

});

