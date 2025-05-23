<template>
  <div class="min-h-screen flex flex-col" :dir="currentLang === 'he' ? 'rtl' : 'ltr'">
    <!-- 导航栏 -->
    <el-header class="bg-white shadow-md py-2">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="text-xl font-bold">RTL 语言支持演示</div>
        <div class="flex space-x-4">
          <el-button @click="setLanguage('en')" size="small">English</el-button>
          <el-button @click="setLanguage('he')" size="small">עברית</el-button>
        </div>
      </div>
    </el-header>

    <!-- 主要内容 -->
    <el-main class="flex-grow container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <el-card class="mb-8">
          <template #header>
            <h1 class="text-3xl font-bold">
              {{ currentLang === "he" ? "דף הבית" : "Home Page" }}
            </h1>
          </template>

          <p class="text-gray-700 mb-6">
            {{
              currentLang === "he"
                ? "דף זה מדגים תמיכה בשפה העברית ובתצורה RTL. טקסט זה מוצג באופן תמידי עם כיוון מימין לשמאל."
                : "This page demonstrates Hebrew language support and RTL layout. This text is displayed in a right-to-left direction."
            }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <!-- 希伯来语文本示例 -->
            <el-card shadow="hover">
              <template #header>
                <h3 class="font-bold text-lg">
                  {{ currentLang === "he" ? "דוגמה לטקסט בעברית" : "Hebrew Text Example" }}
                </h3>
              </template>
              <p class="text-gray-700">
                {{
                  currentLang === "he"
                    ? "טקסט בעברית מוצג מימין לשמאל. זהו דוגמה לשימוש בטקסט בעברית באתר 웹 עם תמיכה RTL."
                    : "Hebrew text is displayed from right to left. This is an example of using Hebrew text on a website with RTL support."
                }}
              </p>
            </el-card>

            <!-- 英文文本示例 -->
            <el-card shadow="hover">
              <template #header>
                <h3 class="font-bold text-lg">
                  {{ currentLang === "he" ? "דוגמה לטקסט באנגלית" : "English Text Example" }}
                </h3>
              </template>
              <p class="text-gray-700">
                {{
                  currentLang === "he"
                    ? "טקסט באנגלית מוצג משמאל לימין. זהו דוגמה לשימוש בטקסט באנגלית באתר עם תמיכה דו-כיוון."
                    : "English text is displayed from left to right. This is an example of using English text on a bilingual website."
                }}
              </p>
            </el-card>
          </div>
        </el-card>

        <!-- RTL 布局示例 -->
        <el-card>
          <template #header>
            <h2 class="text-2xl font-bold">
              {{ currentLang === "he" ? "דוגמה לתצורה RTL" : "RTL Layout Example" }}
            </h2>
          </template>

          <el-row class="mb-8" :gutter="20">
            <el-col :span="12">
              <el-card shadow="hover">
                <template #header>
                  <h3 class="font-bold text-lg">
                    {{ currentLang === "he" ? "תכונה 1" : "Feature 1" }}
                  </h3>
                </template>
                <p class="text-gray-700">
                  {{
                    currentLang === "he"
                      ? "תכונה זו מדגימה את התצורה בכיוון מימין לשמאל כאשר המשתמש עובד בעברית."
                      : "This feature demonstrates right-to-left layout when the user is working in Hebrew."
                  }}
                </p>
              </el-card>
            </el-col>

            <el-col :span="12">
              <el-card shadow="hover">
                <template #header>
                  <h3 class="font-bold text-lg">
                    {{ currentLang === "he" ? "תכונה 2" : "Feature 2" }}
                  </h3>
                </template>
                <p class="text-gray-700">
                  {{
                    currentLang === "he"
                      ? "תכונה זו מדגימה את התצורה בכיוון מימין לשמאל כאשר המשתמש עובד בעברית."
                      : "This feature demonstrates right-to-left layout when the user is working in Hebrew."
                  }}
                </p>
              </el-card>
            </el-col>
          </el-row>

          <!-- ElementPlus 表单示例 -->
          <el-card class="mb-6">
            <template #header>
              <h3 class="font-bold text-lg">
                {{ currentLang === "he" ? "טופס עם ElementPlus" : "ElementPlus Form" }}
              </h3>
            </template>

            <el-form :model="form" label-width="120px">
              <el-form-item :label="currentLang === 'he' ? 'שם מלא' : 'Full Name'">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item :label="currentLang === 'he' ? 'כתובת דואל' : 'Email'">
                <el-input v-model="form.email"></el-input>
              </el-form-item>

              <el-form-item :label="currentLang === 'he' ? 'הודעה' : 'Message'">
                <el-input type="textarea" v-model="form.message" :rows="4"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm">
                  {{ currentLang === "he" ? "שלח" : "Submit" }}
                </el-button>
                <el-button @click="resetForm">
                  {{ currentLang === "he" ? "אפס" : "Reset" }}
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>

          <!-- ElementPlus 表格示例 -->
          <el-card>
            <template #header>
              <h3 class="font-bold text-lg">
                {{ currentLang === "he" ? "טבלת נתונים" : "Data Table" }}
              </h3>
            </template>

            <el-table :data="tableData" stripe>
              <el-table-column prop="name" :label="currentLang === 'he' ? 'שם' : 'Name'"></el-table-column>
              <el-table-column prop="age" :label="currentLang === 'he' ? 'גיל' : 'Age'"></el-table-column>
              <el-table-column prop="address" :label="currentLang === 'he' ? 'כתובת' : 'Address'"></el-table-column>
              <el-table-column :label="currentLang === 'he' ? 'פעולות' : 'Actions'">
                <template #default="scope">
                  <el-button size="small" type="primary" @click="editRow(scope.row)">
                    {{ currentLang === "he" ? "ערוך" : "Edit" }}
                  </el-button>
                  <el-button size="small" type="danger" @click="deleteRow(scope.row)">
                    {{ currentLang === "he" ? "מחק" : "Delete" }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-card>
      </div>
    </el-main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentLang = ref("en"); // 默认语言为英语

const form = ref({
  name: "",
  email: "",
  message: "",
});

const tableData = ref([
  {
    name: currentLang.value === "he" ? "אבי כהן" : "John Smith",
    age: 30,
    address: currentLang.value === "he" ? "רחוב הירק 12, תל אביב" : "12 Green Street, Tel Aviv",
  },
  {
    name: currentLang.value === "he" ? "שרה לוי" : "Sarah Levy",
    age: 25,
    address: currentLang.value === "he" ? "רחוב הכחול 45, ירושלים" : "45 Blue Street, Jerusalem",
  },
  {
    name: currentLang.value === "he" ? "משה פ�erez" : "Moshe Perez",
    age: 42,
    address: currentLang.value === "he" ? "רחוב האדום 78, חיפה" : "78 Red Street, Haifa",
  },
]);

const setLanguage = (lang) => {
  currentLang.value = lang;
  // 将<html>标签 的 lang 属性改成 he、将 dir 属性改成 rtl
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  document.documentElement.lang = lang;

  // 更新表格数据语言
  tableData.value = [
    {
      name: lang === "he" ? "אבי כהן" : "John Smith",
      age: 30,
      address: lang === "he" ? "רחוב הירק 12, תל אביב" : "12 Green Street, Tel Aviv",
    },
    {
      name: lang === "he" ? "שרה לוי" : "Sarah Levy",
      age: 25,
      address: lang === "he" ? "רחוב הכחול 45, ירושלים" : "45 Blue Street, Jerusalem",
    },
    {
      name: lang === "he" ? "משה פ�erez" : "Moshe Perez",
      age: 42,
      address: lang === "he" ? "רחוב האדום 78, חיפה" : "78 Red Street, Haifa",
    },
  ];
};

const submitForm = () => {
  console.log("Submitted form:", form.value);
  alert(currentLang.value === "he" ? "הטופס נשלח בהצלחה!" : "Form submitted successfully!");
};

const resetForm = () => {
  form.value = {
    name: "",
    email: "",
    message: "",
  };
};

const editRow = (row) => {
  console.log("Editing row:", row);
  alert(currentLang.value === "he" ? `עורך ${row.name}` : `Editing ${row.name}`);
};

const deleteRow = (row) => {
  console.log("Deleting row:", row);
  alert(currentLang.value === "he" ? `מחק ${row.name}` : `Deleted ${row.name}`);
};
</script>

<style scoped>
/* 示例 RTL 样式 */
.rtl-example {
  margin-left: 20px; /* 会被 loader 转换为 margin-right 在 RTL 模式下 */
  text-align: left; /* 会被 loader 转换为 text-align: right 在 RTL 模式下 */
}

/* 自定义 ElementPlus 样式 */
:deep(.el-card__header) {
  font-weight: bold;
}

:deep(.el-table) {
  margin-top: 20px;
}
</style>
