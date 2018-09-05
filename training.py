import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
from tensorflow.examples.tutorials.mnist import input_data
from tensorflow.contrib.layers import fully_connected, batch_norm, dropout
from tensorflow.contrib.framework import arg_scope
from sklearn.model_selection import train_test_split
tf.set_random_seed(777)

class Model:
	def __init__(self,sess,name):
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
		return sess.run(self.accuracy,feed_dict={
			self.X:x_test,self.Y_one_hot:y_test,self.keep_prob: 1})
	def predict(self, x_test):
		return self.sess.run(self.H, feed_dict={self.X:x_test,self.keep_prob: 1})

xy = np.loadtxt('refineData.txt', delimiter=',', dtype=np.float32)
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


sess.run(tf.global_variables_initializer())

for epoch in range(training_epochs):
	avg_cost_list = np.zeros(len(models))
	batch_num = int(len(X_train) / batch_size)
	for batch in range(batch_num):
		x_train_batch = np.array(X_train[batch_num*batch:batch_num*(batch+1), :],dtype=np.float32)
		y_train_batch = np.array(y_train_one_hot[batch_num*batch:batch_num*(batch+1), :],dtype=np.float32)
		for m_idx, m in enumerate(models):
			cost_val,_ = m.train(x_train_batch,y_train_batch)
			avg_cost_list[m_idx] += cost_val / batch_num
			accuracy_val = m.get_accuracy(x_train_batch,y_train_batch)
			cost_history.append(cost_val)
			accuracy_history.append(accuracy_val)
			print("epoch",epoch,"batch",batch,"model",m_idx,"cost",cost_val, "accuracy", accuracy_val)

test_size = len(X_test)
predictions = np.zeros([test_size,10])
for m_idx, m in enumerate(models):
	p = m.predict(X_test)
	predictions += p

accuracy_average = tf.reduce_mean(accuracy_history[-50:])
print("accuracy average",sess.run(accuracy_average))

ensemble_correct_prediction = tf.equal(tf.argmax(predictions, 1), tf.argmax(y_test_one_hot, 1))
ensemble_accuracy = tf.reduce_mean(tf.cast(ensemble_correct_prediction, tf.float32))
print('Ensemble accuracy:', sess.run(ensemble_accuracy))


plt.plot(cost_history)
plt.show()