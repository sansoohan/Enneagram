import tensorflow as tf

graph_def_file = './classification_model.pb'

input_arrays = ["x"]
output_arrays = ["output"]

converter = tf.lite.TFLiteConverter.from_frozen_graph(
    graph_def_file, input_arrays, output_arrays)
converter.optimizations = [tf.lite.Optimize.DEFAULT]

tflite_model = converter.convert()
open("./enneagram_classification_model.tflite", "wb").write(tflite_model)

