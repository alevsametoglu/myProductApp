<script setup>
import { Form } from "ant-design-vue";
import { ref, onUpdated } from "vue";
// validation form with useForm in  Form vue
const useForm = Form.useForm;
const formState = ref({
  name: "",
  price: "",
  city: "",
  refNumber: "",
});
const rulesRef = ref({
  name: [
    {
      required: true,
      message: "Please input name",
    },
  ],
  price: [
    {
      required: true,
      message: "Please input price",
    },
  ],
  city: [
    {
      required: true,
      message: "Please input city",
    },
  ],
  refNumber: [
    {
      required: true,
      message: "Please input ref",
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);
const props = defineProps({ show: Boolean, product: Object });
const emit = defineEmits(["close", "submit"]);

function closeModal() {
  emit("close");
  resetFields();
}

function createProduct() {
  validate()
    .then((formValues) => {
      emit("submit", formValues);
      resetFields();
    })
    .catch((err) => {
      console.log("error", err);
    });
}

onUpdated(() => {
  console.log(props.product);
  if (props.show && props.product) formState.value = props.product;
});
</script>

<template>
  <div>
    <a-modal
      :visible="show"
      okText="Create"
      title="Create new Product"
      @ok="createProduct"
      @cancel="closeModal"
    >
      <a-form :labelCol="{ span: 4 }" :wrapperCol="{ span: 14 }">
        <a-form-item label="Name" v-bind="validateInfos.name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="Price" v-bind="validateInfos.price">
          <a-input type="number" v-model:value="formState.price" />
        </a-form-item>
        <a-form-item label="City" v-bind="validateInfos.city">
          <a-input v-model:value="formState.city" />
        </a-form-item>
        <a-form-item label="Ref" v-bind="validateInfos.refNumber">
          <a-input v-model:value="formState.refNumber" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped></style>
