import tensorflow as tf
import numpy as np
from tensorflow.contrib.layers import fully_connected, batch_norm, dropout

class Model:
	def __init__(self,sess,name):
		tf.set_random_seed(777)
		self.sess = sess
		self.name = name
		self._build_net()
	def _build_net(self):
		self.keep_prob = tf.placeholder(tf.float32)
		self.X = tf.placeholder(tf.float32, shape=[None,676])

		W1 = tf.Variable(tf.random_normal([676, 256])/np.sqrt(676/2))
		b1 = tf.Variable(tf.random_normal([256]))
		L1 = tf.nn.relu(tf.matmul(self.X, W1) + b1)
		L1 = tf.nn.dropout(L1, keep_prob=self.keep_prob)

		W2 = tf.Variable(tf.random_normal([256, 256])/np.sqrt(256/2))
		b2 = tf.Variable(tf.random_normal([256]))
		L2 = tf.nn.relu(tf.matmul(L1, W2) + b2)
		L2 = tf.nn.dropout(L2, keep_prob=self.keep_prob)

		W3 = tf.Variable(tf.random_normal([256, 10])/np.sqrt(256/2))
		b3 = tf.Variable(tf.random_normal([10]))
		self.H = tf.matmul(L2, W3) + b3

		self.Y_one_hot = tf.placeholder(tf.float32,shape=[None,10])

		self.cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=self.H, labels=self.Y_one_hot))
		optimizer = tf.train.AdamOptimizer(learning_rate=0.0001)
		self.train1 = optimizer.minimize(self.cost)

		predicted = tf.argmax(self.H,1)
		self.accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, tf.argmax(self.Y_one_hot,1)), tf.float32))

	def train(self, x_data, y_data):
		return self.sess.run([self.cost,self.train1],feed_dict={
			self.X:x_data,self.Y_one_hot:y_data,self.keep_prob: 0.7})
	def get_accuracy(self, x_test, y_test):
		return self.sess.run(self.accuracy,feed_dict={
			self.X:x_test,self.Y_one_hot:y_test,self.keep_prob: 1})
	def predict(self, x_test):
		return self.sess.run(self.H, feed_dict={self.X:x_test,self.keep_prob: 1})
