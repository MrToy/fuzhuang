package main

import (
	"flag"
	"github.com/nfnt/resize"
	"image/jpeg"
	"image/png"
	"os"
)

func main() {
	w := flag.Uint("w", 0, "width")
	h := flag.Uint("h", 0, "height")
	ty := flag.String("t", "jpg", "image type")
	flag.Parse()
	if *ty == "png" {
		src, err := png.Decode(os.Stdin)
		if err != nil {
			panic(err)
		}
		dst := resize.Resize(*w, *h, src, resize.Lanczos3)
		png.Encode(os.Stdout, dst)
	} else if *ty == "jpg" {
		src, err := jpeg.Decode(os.Stdin)
		if err != nil {
			panic(err)
		}
		dst := resize.Resize(*w, *h, src, resize.Lanczos3)
		jpeg.Encode(os.Stdout, dst, nil)
	}

}
