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

saver = tf.train.Saver()
save_path = saver.save(sess, "./enneagram_classification_model.ckpt")
print("Model saved in path: %s" % save_path)

plt.plot(cost_history)
plt.show()