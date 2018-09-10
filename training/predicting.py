import sys, os
sys.path.append(os.curdir)
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import train_test_split
from myModel import Model

xy = np.array(sys.argv[1].split(","), dtype=np.float32)
xy = np.reshape(xy, (-1,677))

x_data = xy[:, 0:-1]
y_data = np.array(xy[:, [-1]],dtype=np.int)
target = np.array(y_data).reshape(-1)
y_data_one_hot = np.eye(10)[target]

X_train, X_test, y_train_one_hot, y_test_one_hot = train_test_split(x_data, y_data_one_hot, test_size=0.2)

training_epochs = 10
batch_size = 100

cost_history = []
accuracy_history = []
models = []

sess = tf.Session()
models = []
num_models = 7
for m in range(num_models):
	models.append(Model(sess,"model"+str(m)))

saver = tf.train.Saver()
saver.restore(sess, "./enneagram_classification_model.ckpt")

test_size = len(X_test)
predictions = np.zeros([test_size,10])
for m_idx, m in enumerate(models):
	p = m.predict(X_test)
	predictions += p

print(sess.run(tf.argmax(predictions, 1)))

