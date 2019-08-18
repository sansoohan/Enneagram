import tensorflow as tf
import numpy as np
from tensorflow.contrib.layers import fully_connected, batch_norm, dropout
#  scp -r -i /c/Program\ Files/Git/test_swarm.pem ~/Desktop/Develope/Enneagram/BigDataAnalyzing ubuntu@15.164.35.0:/home/ubuntu/
class Model:
	def __init__(self,sess,name,input_placeholder, keep_prob_placeholder, y_one_hot_placeholder):
		tf.compat.v1.set_random_seed(777)
		self.sess = sess
		self.name = name
		self._build_net(input_placeholder, keep_prob_placeholder, y_one_hot_placeholder)
	
	def _build_net(self, input_placeholder, keep_prob_placeholder, y_one_hot_placeholder):
		self.keep_prob = keep_prob_placeholder
		self.X = input_placeholder
		self.Y_one_hot = y_one_hot_placeholder

		W1 = tf.compat.v1.Variable(tf.compat.v1.random_normal([676, 256])/np.sqrt(676/2))
		b1 = tf.compat.v1.Variable(tf.compat.v1.random_normal([256]))
		L1 = tf.compat.v1.nn.relu(tf.matmul(self.X, W1) + b1)
		L1 = tf.compat.v1.nn.dropout(L1, rate=1-self.keep_prob)

		W2 = tf.compat.v1.Variable(tf.compat.v1.random_normal([256, 256])/np.sqrt(256/2))
		b2 = tf.compat.v1.Variable(tf.compat.v1.random_normal([256]))
		L2 = tf.compat.v1.nn.relu(tf.matmul(L1, W2) + b2)
		L2 = tf.compat.v1.nn.dropout(L2, rate=1-self.keep_prob)

		W3 = tf.compat.v1.Variable(tf.compat.v1.random_normal([256, 10])/np.sqrt(256/2))
		b3 = tf.compat.v1.Variable(tf.compat.v1.random_normal([10]))
		self.H = tf.compat.v1.add(tf.compat.v1.matmul(L2, W3),b3)

		# self.Y_one_hot = tf.compat.v1.placeholder(tf.compat.v1.float32,shape=[None,10])

		self.cost = tf.compat.v1.reduce_mean(tf.compat.v1.nn.softmax_cross_entropy_with_logits_v2(logits=self.H, labels=self.Y_one_hot))
		optimizer = tf.compat.v1.train.AdamOptimizer(learning_rate=0.0001)
		self.train1 = optimizer.minimize(self.cost)

		predicted = tf.compat.v1.argmax(self.H,1)
		self.accuracy = tf.compat.v1.reduce_mean(tf.cast(tf.equal(predicted, tf.argmax(self.Y_one_hot,1)), tf.float32))

	def train(self, x_data, y_data):
		return self.sess.run([self.cost,self.train1],feed_dict={
			self.X:x_data,self.Y_one_hot:y_data,self.keep_prob: 0.7})
	def get_accuracy(self, x_test, y_test):
		return self.sess.run(self.accuracy,feed_dict={
			self.X:x_test,self.Y_one_hot:y_test,self.keep_prob: 1})
	def predict(self, x_test):
		return self.sess.run(self.H, feed_dict={self.X:x_test,self.keep_prob: 1})