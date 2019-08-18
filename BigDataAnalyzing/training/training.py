import sys, os
sys.path.append(os.curdir)
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import train_test_split
from myModel import Model

xy = np.loadtxt('../data/refineData.txt', delimiter=',', dtype=np.float32)
x_data = xy[:, 0:-1]
y_data = np.array(xy[:, [-1]],dtype=np.int)
target = np.array(y_data).reshape(-1)
y_data_one_hot = np.eye(10)[target]

X_train, X_test, y_train_one_hot, y_test_one_hot = train_test_split(x_data, y_data_one_hot, test_size=0.2)
print(X_train.shape)

input_placeholder = tf.compat.v1.placeholder(dtype=tf.float32, shape=[None,676], name='x')
keep_prob_placeholder = tf.compat.v1.placeholder(tf.float32)
y_one_hot_placeholder = tf.compat.v1.placeholder(tf.compat.v1.float32,shape=[None,10])

training_epochs = 10
batch_size = 100

cost_history = []
accuracy_history = []
models = []

sess = tf.compat.v1.Session()
models = []
num_models = 7

predictions = None
for m_idx in range(num_models):
	m = Model(sess,"model"+str(m_idx), input_placeholder, keep_prob_placeholder, y_one_hot_placeholder)
	models.append(m)
	if predictions == None:
		predictions = tf.compat.v1.zeros(tf.shape(m.H))
	predictions = tf.compat.v1.add(predictions, m.H)

prediction_output = tf.compat.v1.argmax(predictions, 1, name='output')

sess.run(tf.compat.v1.global_variables_initializer())
# save model as pbtxt
saved_path = './'
tf.io.write_graph(sess.graph_def, saved_path, 'enneagram_classification_model.pbtxt')

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


# save weight as ckpt
saver = tf.compat.v1.train.Saver()
saver.save(sess, "./enneagram_classification_model.ckpt")

test_output = tf.compat.v1.argmax(y_test_one_hot, 1)
correct_predict_count = tf.compat.v1.equal(self.sess.run(prediction_output, feed_dict={input_placeholder: X_test, keep_prob_placeholder: 1}), test_output)
ensemble_accuracy = tf.compat.v1.reduce_mean(tf.compat.v1.cast(correct_predict_count, tf.float32))
print('Ensemble accuracy:', sess.run(ensemble_accuracy))

accuracy_average = tf.compat.v1.reduce_mean(accuracy_history[-50:])
print("accuracy average",sess.run(accuracy_average))

plt.plot(cost_history)
plt.show()