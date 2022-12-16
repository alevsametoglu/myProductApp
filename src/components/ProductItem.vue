<script setup>
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { Row, Col } from "ant-design-vue";

defineProps({
  name: String,
  price: Number,
  city: String,
  refNumber: String,
});

const emit = defineEmits(["delete", "update"]);
</script>

<template>
  <a-card hoverable>
    <template #actions>
      <delete-outlined
        key="delete"
        style="color: red"
        @click="emit('delete')"
      />
      <edit-outlined key="edit" style="color: blue" @click="emit('update')" />
    </template>
    <a-card-meta>
      <template #title>
        <Row>
          <Col span="18">{{ name }}</Col>
          <Col span="6" style="text-align: right"
            >{{ price }} <span>&#8364;</span></Col
          >
        </Row>
      </template>
      <template #description>
        <Row>
          <Col span="14">{{ city }}</Col>
          <Col span="10" style="text-align: right"> ref:{{ refNumber }}</Col>
        </Row>
      </template>
    </a-card-meta>
  </a-card>
</template>
