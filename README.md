
# Crime Detection System using Face Recognition based on Machine Learning

The Face Recognition Web Application for Crime Prevention is an application that utilizes machine learning technology to recognize faces and prevent crime.

The system is designed to identify suspects by comparing their facial features with those in a database of known criminals. 

<b>Supporting Material:</b> https://drive.google.com/file/d/1pcG-72WVB-8UwsnUoz_L73FGz-k1Bvim/view?usp=sharing
<b>Web App Link:</b> https://frme.igscs.in/login 
<br/>
Username: Admin_1 
Password: 12345678

![Architecture](./architecture.png)


<h4>Face Recognition Web Application for Crime Prevention.</h4>
This code sample consists of Machine Learning Model & a Web Application for face recognition.

<b>How it will prevent crime?</b><br/>
Whenever a person is recognized with 98%+ accuracy, the web app sends an email to the admin and can also send it to Police. 

<b>How does it work?</b><br/>
On executing file face_recognition_model.ipynb in the Github repository, the following steps are done:
01) Capture images to train a model.
02) Image Labelling of captured images
03) Partitioning of labeled images in the Training & Testing section
04) Model Training
05) Model Evaluation
06) Model Export (JSON file is created)

<b>Model Training Tech Stack: </b><br/>
01) Python
02) Tensorflow Object Detection API
03) OpenCV
 
Then we host this JSON File and link it with our web application.
The web application uses the deployed Machine Learning model and can detect faces with 98%+ accuracy within 4 sec.

<b>Web Application Tech Stack: </b><br/>
01) Backend: Next.JS, Node.JS
02) Database: MongoDB
03) Frontend: HTML5, CSS3, Javascript & JSX
04) Version Control: Git




#### Code is Platform Independent and can easily run on Linux, Windows & Google Colab.

Google Colab Notebook Link: https://colab.research.google.com/drive/1NeGuc0xFChaScWOOub5GbGsoudWhNdH1?usp=sharing




## Steps to run on Google Colab

Step 1. Open Notebook: https://colab.research.google.com/drive/1NeGuc0xFChaScWOOub5GbGsoudWhNdH1?usp=sharing

Step 2. Set Notebook settings to GPU (It is required for training model)

Step 3. Run cells upto folder setup

Step 4: At section 1.4 Capturing Images you can uncommment the code & run it to capture at that moment or you can run next cell to add images in Tensorflow/workspace/models/my_ssd_mobnet

Step 5: After section 1.5 Labeling Images you need to manually divide collected images into two folders train and test. So now all folders and annotations should be split between the following two folders.
\Tensorflow\workspace\images\train
\Tensorflow\workspace\images\test

Step 6: At section 2.11 Load Train Model From Checkpoint: Please make sure to enter latest Checkoint name and then run this cell.
You can find it in Tensorflow/workspace/models/my_ssd_mobnet

Step 7: Run all cells

After excecuting all the cells you will get your model as model.json in Tensorflow/workspace/models/my_ssd_mobnetTensorflow/workspace/models/my_ssd_mobnet/tfjsexport

Step 8: You can optionally evaluate your model inside of Tensorboard. 

Once the model has been trained and you have run the evaluation command under 

Navigate to the evaluation folder for your trained model e.g. cd Tensorlfow/workspace/models/my_ssd_mobnet/eval
and open Tensorboard with the following command

`tensorboard --logdir=.`
 
Tensorboard will be accessible through your browser and you will be able to see metrics including mAP - mean Average Precision, and Recall.


## Dependencies to run on Windows/Linux


1. System requirements: 

a. Windows: Windows 7 or higher (64-bit)

b. Linux: If Ubuntu 16.04 or higher (64-bit) 

2. Hardware requirements: NVIDIA GPU card with CUDA architectures 3.5, 5.0, 6.0, 7.0, 7.5, 8.0 and higher.

3. Software requirements:
a. Python 3.7–3.10

b. pip version 19.0

c. Windows: Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017 and 2019

d. NVIDIA® GPU drivers version 450.80.02 or higher.

e. CUDA® Toolkit 11.2.

f. cuDNN SDK 8.1.0.



## Steps to run on Windows/Linux

Step 1. Clone this repository: https://github.com/apoorva-01/Face-Recognition-WebApp-For-Crime-Prevention

Step 2. Create a new virtual environment

`python -m venv frme`

Step 3. Activate your virtual environment

`source tfod/bin/activate # Linux`
`.\tfod\Scripts\activate # Windows` 

Step 4. Install dependencies and add virtual environment to the Python Kernel

`python -m pip install --upgrade pip`

`pip install ipykernel`

`python -m ipykernel install --user --name=frme`

`pip install jupyter`


Step 5. Run Notebook (Ensure you change the kernel to the virtual environment as shown below)

Step 6. Run cells upto folder setup

Step 7: At section 1.4 Capturing Images you can uncommment the code & run it to capture at that moment or you can run next cell to add images in Tensorflow/workspace/models/my_ssd_mobnet

Step 8: After section 1.5 Labeling Images you need to manually divide collected images into two folders train and test. So now all folders and annotations should be split between the following two folders.
\Tensorflow\workspace\images\train
\Tensorflow\workspace\images\test

Step 9: At section 2.11 Load Train Model From Checkpoint: Please make sure to enter latest Checkoint name and then run this cell.
You can find it in Tensorflow/workspace/models/my_ssd_mobnet

Step 10: Run all cells


