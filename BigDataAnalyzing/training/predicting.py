import sys, os
sys.path.append(os.curdir)
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import train_test_split
from myModel import Model

X_test = np.array(sys.argv[1].split(",")[:-1], dtype=np.float32)
X_test = np.reshape(X_test, (-1,676))

models = []

sess = tf.compat.v1.Session()
models = []
num_models = 7
input_placeholder = tf.compat.v1.placeholder(dtype=tf.float32, shape=[None,676], name="x")
for m in range(num_models):
	models.append(Model(sess,"model"+str(m),input_placeholder))

saver = tf.compat.v1.train.Saver()
saver.restore(sess, "./enneagram_classification_model.ckpt")

test_size = len(X_test)
predictions = np.zeros([test_size,10])
for m_idx, m in enumerate(models):
	p = m.predict(X_test)
	predictions += p

print(sess.run(tf.compat.v1.argmax(predictions, 1, name='output')))

