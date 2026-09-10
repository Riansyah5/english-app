import struct

def make_png(width, height, color):
    # A simple way to make a valid PNG without Pillow is to construct the binary chunks manually, 
    # but it's tricky. Instead, here is a known base64 1x1 transparent png, we can't easily scale it to 192x192.
    # Wait, actually there's an easier way: just write a BMP or simple format? No, PWA requires PNG or SVG.
    pass
