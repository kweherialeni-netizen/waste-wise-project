<script setup>
import { ref } from 'vue'
import { useEmployeesStore } from '../stores/employees'
import { useBottlesStore } from '../stores/bottles'
import { useTransactionsStore } from '../stores/transactions'

// Stores
const employeesStore = useEmployeesStore()
const bottlesStore = useBottlesStore()
const transactionsStore = useTransactionsStore()

// Data from stores
const employees = employeesStore.employees
const bottles = bottlesStore.bottles
const transactions = transactionsStore.transactions

// UI
const tab = ref(1)

// Dialogs
const showAddEmployeeDialog = ref(false)
const showAddBottleDialog = ref(false)

// Models
// --- Employee Models ---
const empName = ref(null)
const empRole = ref('Cashier')

// --- Bottle Models ---
const bottleName = ref(null)
const bottleType = ref('Plastic')
const bottlePoints = ref(null)

// Functions
function close() {
  showAddEmployeeDialog.value = false
  showAddBottleDialog.value = false

  // reset models
  empName.value = null
  empRole.value = 'Cashier'
  bottleName.value = null
  bottleType.value = 'Plastic'
  bottlePoints.value = null
}

// Add employee
function addEmployee() {
  employeesStore.addEmployee({
    name: empName.value,
    role: empRole.value,
  })

  close()
}

// Add bottle
function addBottle() {
  bottlesStore.addBottle({
    name: bottleName.value,
    type: bottleType.value,
    points: bottlePoints.value,
  })

  close()
}

// status toggles
function toggleEmployee(emp) {
  employeesStore.toggleEmployee(emp)
}

function toggleBottle(bottle) {
  bottlesStore.toggleBottle(bottle)
}
</script>


<template>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" align-tabs="center" color="primary">
        <v-tab :value="1">Employees</v-tab>
        <v-tab :value="2">Bottles</v-tab>
        <v-tab :value="3">Transactions</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">

        <!-- EMPLOYEES TAB -->
        <v-tabs-window-item :value="1">
          <div 
            v-if="employees == null || employees == undefined || employees.length === 0"
            align="center"
          >
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-h6">No employees found</div>
              </v-col>
            </v-row>
          </div>

          <div v-else>
            <v-container>
              <v-row class="ma-2">
                <v-col>
                  <v-btn
                    class="ma-2"
                    color="blue-darken-2"
                    icon="mdi-plus"
                    @click="showAddEmployeeDialog = true"
                  ></v-btn>

                  <v-table class="border">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Points</th>
                        <th>Status</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="emp in employees" :key="emp.id">
                        <td>{{ emp.name }}</td>
                        <td>{{ emp.role }}</td>
                        <td>{{ emp.points }}</td>
                        <td>{{ emp.active ? 'Active' : 'Inactive' }}</td>
                        <td align="center">
                          <v-btn
                            size="small"
                            color="warning"
                            @click="toggleEmployee(emp)"
                          >
                            {{ emp.active ? 'Deactivate' : 'Activate' }}
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-tabs-window-item>

        <!-- BOTTLES TAB -->
        <v-tabs-window-item :value="2">
          <div 
            v-if="bottles == null || bottles == undefined || bottles.length === 0"
            align="center"
          >
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-h6">No bottles found</div>
              </v-col>
            </v-row>
          </div>

          <div v-else>
            <v-container>
              <v-row class="ma-2">
                <v-col>
                  <v-btn
                    class="ma-2"
                    color="blue-darken-2"
                    icon="mdi-plus"
                    @click="showAddBottleDialog = true"
                  ></v-btn>

                  <v-table class="border">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Points</th>
                        <th>Status</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="b in bottles" :key="b.id">
                        <td>{{ b.name }}</td>
                        <td>{{ b.type }}</td>
                        <td>{{ b.points }}</td>
                        <td>{{ b.active ? 'Active' : 'Inactive' }}</td>
                        <td align="center">
                          <v-btn
                            size="small"
                            color="warning"
                            @click="toggleBottle(b)"
                          >
                            {{ b.active ? 'Deactivate' : 'Activate' }}
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>

                  </v-table>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-tabs-window-item>

        <!-- TRANSACTIONS TAB -->
        <v-tabs-window-item :value="3">
          <div 
            v-if="transactions == null || transactions == undefined || transactions.length === 0"
            align="center"
          >
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-h6">No transactions found</div>
              </v-col>
            </v-row>
          </div>

          <div v-else>
            <v-container>
              <v-table class="border">
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
            </v-container>
          </div>
        </v-tabs-window-item>

      </v-tabs-window>
    </v-card>
  </v-container>

  <!-- ADD EMPLOYEE DIALOG -->
  <v-dialog v-model="showAddEmployeeDialog" max-width="500">
    <v-card>
      <v-card-title class="pa-4">
        Add Employee
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" @click="close"></v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field label="Name" v-model="empName"></v-text-field>
        <v-text-field label="Role" v-model="empRole"></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="addEmployee">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ADD BOTTLE DIALOG -->
  <v-dialog v-model="showAddBottleDialog" max-width="500">
    <v-card>
      <v-card-title class="pa-4">
        Add Bottle
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" @click="close"></v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field label="Name" v-model="bottleName"></v-text-field>
        <v-text-field label="Type" v-model="bottleType"></v-text-field>
        <v-text-field label="Points" type="number" v-model="bottlePoints"></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="addBottle">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
