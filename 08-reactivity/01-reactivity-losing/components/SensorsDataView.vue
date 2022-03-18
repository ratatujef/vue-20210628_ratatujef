<template>
  <div v-if="!sensors">Loading...</div>
  <template v-else>
    <sensors-data-row v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />
  </template>
</template>

<script>
import { SensorsDataController } from '../services/SensorsDataController';
import { SensorsDataStreamingService } from '../services/SensorsDataStreamingService';
import SensorsDataRow from './SensorsDataRow';

export default {
  name: 'SensorsDataView',

  components: { SensorsDataRow },

  data() {
    return {
      sensors: null,
    };
  },

  mounted() {
    this.sensorsDataController = new SensorsDataController(new SensorsDataStreamingService());
    this.sensorsDataController.addDataCallback(this.callback);

    // Раз в секунду запрашиваем и выводим новые данные сенсоров
    setInterval(() => {
      this.sensorsDataController.getData();
    }, 1000);
  },

  beforeUnmount() {
    this.sensorsDataController.removeDataCallback(this.callback);
    this.sensorsDataController.close();
  },

  methods: {
    callback(data) {
      this.setData(data);
    },

    setData(sensors) {
      this.sensors = {};
<<<<<<< HEAD
      Object.keys(sensors).forEach((el) => {
        this.sensors[el] = { ...sensors[el] };
      });
=======
      for (const sensorId in sensors) {
        this.sensors[sensorId] = { ...sensors[sensorId] };
      }
>>>>>>> c03b065e38ab2ca230b1db0ffa2ec64097096a5f
    },
  },
};
</script>

<style scoped></style>
