#!/bin/bash

echo "[imagegen] Starting!"

DIR=$(dirname $0)
IMAGE_DIR=$(realpath "$DIR/../res/img/furni/")
ID_FILE=$(realpath "$DIR/../res/js/image_list.js")

rm "$ID_FILE"
touch "$ID_FILE"

echo "window.voidImageList = [" >> $ID_FILE

for image_dir in $IMAGE_DIR/normal; do
    cd $image_dir
    for image_file in *; do
        echo "'$(basename $image_file .png)'," >> $ID_FILE
    done
done

echo "];" >> $ID_FILE

echo "[imagegen] Done!"