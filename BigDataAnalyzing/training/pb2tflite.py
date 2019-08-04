import tensorflow as tf

saved_model_dir = './export'

converter = tf.contrib.lite.TFLiteConverter.from_saved_model(saved_model_dir)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]

tflite_model = converter.convert()
open("./converted_model.tflite", "wb").write(tflite_model)