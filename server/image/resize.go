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
	flag.Parse()
	// src, _ := jpeg.Decode(os.Stdin)
	dst := resize.Resize(*w, *h, src, resize.Lanczos3)
	// jpeg.Encode(os.Stdout, dst, nil)
}
