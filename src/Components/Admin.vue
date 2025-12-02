<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tab = ref(1)

// Sample Data
const employees = ref([
  { id: 1, name: 'Alice Johnson', role: 'Cashier', points: 50, active: true },
  { id: 2, name: 'Bob Smith', role: 'Supervisor', points: 120, active: true }
])

const bottles = ref([
  { id: 1, name: 'Sprite Bottle', type: 'Plastic', points: 5, active: true },
  { id: 2, name: 'Mountain Dew Bottle', type: 'Glass', points: 8, active: true }
])

const transactions = ref([
  { id: 1, employee: 'Alice Johnson', bottle: 'Sprite Bottle', points: 5, date: '2025-12-02' },
  { id: 2, employee: 'Bob Smith', bottle: 'Mountain Dew Bottle', points: 8, date: '2025-12-02' }
])

// Dialogs
const showAddEmployeeDialog = ref(false)
const showAddBottleDialog = ref(false)

// Models
const empName = ref('')
const empRole = ref('Cashier')
const bottleName = ref('')
const bottleType = ref('Plastic')
const bottlePoints = ref(0)

// Functions
function closeDialogs() {
  showAddEmployeeDialog.value = false
  showAddBottleDialog.value = false
  empName.value = ''
  empRole.value = 'Cashier'
  bottleName.value = ''
  bottleType.value = 'Plastic'
  bottlePoints.value = 0
}

function addEmployee() {
  employees.value.push({
    id: employees.value.length + 1,
    name: empName.value,
    role: empRole.value,
    points: 0,
    active: true
  })
  closeDialogs()
}

function addBottle() {
  bottles.value.push({
    id: bottles.value.length + 1,
    name: bottleName.value,
    type: bottleType.value,
    points: bottlePoints.value,
    active: true
  })
  closeDialogs()
}

function toggleEmployeeStatus(emp) {
  emp.active = !emp.active
}

function toggleBottleStatus(bottle) {
  bottle.active = !bottle.active
}
</script>

<template>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" background-color="teal-darken-3" color="white">
        <v-tab :value="1">Employees</v-tab>
        <v-tab :value="2">Bottles</v-tab>
        <v-tab :value="3">Transactions</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <!-- Employees Tab -->
        <v-tabs-window-item :value="1">
          <v-btn color="blue-darken-2" class="ma-2" @click="showAddEmployeeDialog = true">+ Add Employee</v-btn>
          <v-table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Points</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emp in employees" :key="emp.id">
                <td>{{ emp.name }}</td>
                <td>{{ emp.role }}</td>
                <td>{{ emp.points }}</td>
                <td>{{ emp.active ? 'Active' : 'Inactive' }}</td>
                <td>
                  <v-btn small color="warning" @click="toggleEmployeeStatus(emp)">
                    {{ emp.active ? 'Deactivate' : 'Activate' }}
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-tabs-window-item>

        <!-- Bottles Tab -->
        <v-tabs-window-item :value="2">
          <v-btn color="blue-darken-2" class="ma-2" @click="showAddBottleDialog = true">+ Add Bottle</v-btn>
          <v-table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Points</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bottle in bottles" :key="bottle.id">
                <td>{{ bottle.name }}</td>
                <td>{{ bottle.type }}</td>
                <td>{{ bottle.points }}</td>
                <td>{{ bottle.active ? 'Active' : 'Inactive' }}</td>
                <td>
                  <v-btn small color="warning" @click="toggleBottleStatus(bottle)">
                    {{ bottle.active ? 'Deactivate' : 'Activate' }}
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-tabs-window-item>

        <!-- Transactions Tab -->
        <v-tabs-window-item :value="3">
          <v-table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Bottle</th>
                <th>Points</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in transactions" :key="t.id">
                <td>{{ t.employee }}</td>
                <td>{{ t.bottle }}</td>
                <td>{{ t.points }}</td>
                <td>{{ t.date }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>

    <!-- Add Employee Dialog -->
    <v-dialog v-model="showAddEmployeeDialog" max-width="500">
      <v-card>
        <v-card-title>Add Employee</v-card-title>
        <v-card-text>
          <v-text-field label="Name" v-model="empName"></v-text-field>
          <v-text-field label="Role" v-model="empRole"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialogs">Cancel</v-btn>
          <v-btn color="primary" @click="addEmployee">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Bottle Dialog -->
    <v-dialog v-model="showAddBottleDialog" max-width="500">
      <v-card>
        <v-card-title>Add Bottle</v-card-title>
        <v-card-text>
          <v-text-field label="Name" v-model="bottleName"></v-text-field>
          <v-text-field label="Type" v-model="bottleType"></v-text-field>
          <v-text-field label="Points" type="number" v-model="bottlePoints"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialogs">Cancel</v-btn>
          <v-btn color="primary" @click="addBottle">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style>
.v-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.v-table th, .v-table td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}
</style>
