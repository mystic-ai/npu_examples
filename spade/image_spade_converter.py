import argparse
import sys
sys.setrecursionlimit(100000)


from PIL import Image
import numpy as np

parser = argparse.ArgumentParser(description='Process some integers.')

parser.add_argument('-i', '--input', dest='input_image_path',
                    help='Input image to process', required=True)

parser.add_argument('-ow', '--output_width', dest='output_width',
                    help='Output image files width', default=64)
                    
parser.add_argument('-oh', '--output_height', dest='output_height',
                    help='Output image files height', default=64)


args = parser.parse_args()

pil_img = Image.open(args.input_image_path).convert("L")

# Resize image
resized_image = pil_img.resize((args.output_width, args.output_height), resample=Image.NEAREST)
image_data = np.array(resized_image)

object_number = 0
instance_data = np.zeros((args.output_width, args.output_height))
'''
for x in range(256):
    for y in range(256):
        if x > 0 and y > 0:
            if image_data[x - 1][y - 1] == image_data[x][y]:
                instance_data[x][y] = instance_data[x - 1][y - 1]
                continue

        if x > 0:
            if image_data[x - 1][y] == image_data[x][y]:
                instance_data[x][y] = instance_data[x - 1][y]
                continue
        
        if y > 0:
            if image_data[x][y - 1] == image_data[x][y]:
                instance_data[x][y] = instance_data[x][y - 1]
                continue
        

        object_number += 1
        instance_data[x][y] = object_number
'''

def fill_check_pixel(x, y, set_val):
    if instance_data[x][y] == set_val:
        return
    instance_data[x][y] = set_val
    print("set")

    if x > 0 and y > 0:
        if image_data[x - 1][y - 1] == image_data[x][y]:
            fill_check_pixel(x - 1, y - 1, set_val)

    if x > 0:
        if image_data[x - 1][y] == image_data[x][y]:
            fill_check_pixel(x - 1, y, set_val)    
    if y > 0:
        if image_data[x][y - 1] == image_data[x][y]:
            fill_check_pixel(x, y - 1, set_val)

    if x < args.output_width - 1 and y < args.output_height - 1:
        if image_data[x + 1][y + 1] == image_data[x][y]:
            fill_check_pixel(x + 1, y + 1, set_val)

    if x < args.output_width - 1:
        if image_data[x + 1][y] == image_data[x][y]:
            fill_check_pixel(x + 1, y, set_val)
    
    if y < args.output_height - 1:
        if image_data[x][y + 1] == image_data[x][y]:
            fill_check_pixel(x, y + 1, set_val)

object_number += 1
for x in range(args.output_width):
    for y in range(args.output_height):
        if instance_data[x][y] > 0:
            continue
        fill_check_pixel(x, y, object_number)
        object_number += 1
        print("inc")

print(object_number)
# Normalize the image data for writing to file

instance_data = np.uint8(((instance_data - np.min(instance_data)) / (np.max(instance_data) - np.min(instance_data)) * 255.0))

# Write the output to disk
output_image_gray = Image.fromarray(image_data)
output_image_gray = output_image_gray.resize((256, 256), resample=Image.NEAREST)
output_image = Image.new("RGBA", output_image_gray.size)
output_image.paste(output_image_gray)
output_image.save("output_" + args.input_image_path)

instance_image_gray = Image.fromarray(instance_data)
instance_image_gray = instance_image_gray.resize((256, 256), resample=Image.NEAREST)
instance_image = Image.new("RGBA", instance_image_gray.size)
instance_image.paste(instance_image_gray)
instance_image.save("instance_" + args.input_image_path)