class VoidImageCollection {
    images = [];

    /**
     * @param {Image[]} images
     */
    add(images) {
        if (!this.images) this.images = []

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
    addTags(tags) {
        if (Array.isArray(tags)) {
            this.tags.concat(toString(tags));
        }
        this.tags.push(toString(tags));
    }
}

window.addEventListener('load', function () {
   var imageCollection = new VoidImageCollection();
   imageCollection.add(window.voidImageList);
   window.voidImageCollection = imageCollection;
})