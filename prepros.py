import cv2
import os
import matplotlib.pyplot as plt

def load_images_from_folder(folder):
    images = []
    for filename in os.listdir(folder):
        img = cv2.imread(os.path.join(folder,filename),0)
        if img is not None:
            images.append(img)
    return images

def showim(img):
    plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    plt.show()

imgs = load_images_from_folder("receipt")

# img = imgs[10]
# for i in range(7,22,2):
#     th = cv2.adaptiveThreshold(img,255,cv2.ADAPTIVE_THRESH_MEAN_C,\
#                 cv2.THRESH_BINARY,11,i)
#     cv2.imshow("{}".format(i),th)
#     cv2.waitKey()
i=0
for img in imgs:
    i+=1
    th = cv2.adaptiveThreshold(img,255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,11,15)
    cv2.imshow("{}".format(i),th)
    cv2.waitKey()
# for each in th:
#     cv2.show
# cv2.imshow()
