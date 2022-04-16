import json
import os
path = './fire/'
file_list = os.listdir(path)
file_list_py = [file for file in file_list if file.endswith('.json')]
print(file_list_py)
checks = len(file_list_py)
count = 0
for i in range(checks):
    with open('./fire/'+file_list_py[i], 'r', encoding='UTF-8-SIG') as f:

        json_data = json.load(f)
    test = json_data["annotations"]
    testing = json_data["image"]["resolution"]
    checking = len(test)

    for j in range(checking):
        test1 = test[j]
        qwe = "polygon" in test1
        qwr = "bbox" in test1

        if(qwe == True):
            check = len(test1["polygon"])
            x_min = test1["polygon"][0][0]
            x_max = test1["polygon"][0][0]
            y_min = test1["polygon"][0][1]
            y_max = test1["polygon"][0][1]
            for k in range(check):
                if(test1["polygon"][k][0]<x_min):
                    x_min = test1["polygon"][k][0]
                if(test1["polygon"][k][0]>x_max):
                    x_max = test1["polygon"][k][0]
                if(test1["polygon"][k][1]<y_min):
                    y_min = test1["polygon"][k][1]
                if(test1["polygon"][k][1]>y_max):
                    y_max = test1["polygon"][k][1]
            width = (x_max - x_min)/testing[0]
            height = (y_max - y_min)/testing[1]
            center_x = ((2/(x_max - x_min))+x_min)/testing[0]
            center_y = ((2/(y_max - y_min))+y_min)/testing[1]

        if(qwr==True):
            x_min = test1["bbox"][0]
            x_max = test1["bbox"][2]
            y_min = test1["bbox"][1]
            y_max = test1["bbox"][3]
            width = (x_max - x_min) / testing[0]
            height = (y_max - y_min) / testing[1]
            center_x = ((2 / (x_max - x_min)) + x_min) / testing[0]
            center_y = ((2 / (y_max - y_min)) + y_min) / testing[1]
        file_name = file_list_py[i].split(".")
        ft = open('E:/화재 발생 예측 영상/Validation/labeling/'+file_name[0]+'.txt','a')
        ft.write(str(int(test1["class"])-1))
        ft.write(" ")
        ft.write(str(center_x))
        ft.write(" ")
        ft.write(str(center_y))
        ft.write(" ")
        ft.write(str(width))
        ft.write(" ")
        ft.write(str(height))
        ft.write("\n")
    count +=1
print(count)
list = []
list.append(json_data["annotations"])
