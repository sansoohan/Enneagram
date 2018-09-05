import tensorflow as tf
import numpy as np
from sklearn.model_selection import train_test_split

xy = np.loadtxt('refineData.txt', delimiter=',', dtype=np.float32)
x_data = xy[:, 0:-1]
y_data = xy[:, [-1]]
X_train, X_test, y_train, y_test = train_test_split(x_data, y_data, test_size=0.2)

