<template>
<v-data-table :headers="headers" :items="students" sort-by="calories" class="elevation-1">
    <template v-slot:top>
        <v-toolbar flat color="white">
            <v-toolbar-title>Student 2022</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">AddStudent</v-btn>
                    </template>
                    <v-card>
                        <v-container>
                            <v-card-title>
                                <span class="headline">Student Profile</span>
                            </v-card-title>
                            <v-form ref="form" v-model="valid" @submit.prevent="create">

                                <v-text-field v-model="editedItem.fname" :rules="requiredRules" label="First Name" required></v-text-field>

                                <v-text-field v-model="editedItem.lnaname" :rules="requiredRules" label="Last Name" required></v-text-field>

                                <v-text-field v-model="editedItem.mname" :rules="requiredRules" label="Last Name" required></v-text-field>

                                <v-text-field v-model="editedItem.batch" :rules="requiredRules" label="Batch" required></v-text-field>

                                <v-text-field v-model="editedItem.username" :rules="requiredRules" label="Username" required></v-text-field>

                                <v-text-field v-model="editedItem.email" :rules="emailRules" label="E-mail" required></v-text-field>

                                <v-text-field v-model="editedItem.password" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="paswordRules" :type="show2 ? 'text' : 'password'" name="input-10-2" label="Password" hint="At least 8 characters" class="input-group--focused" @click:append="show2 = !show2"></v-text-field>

                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="create">
                                        Add Account
                                    </v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editStudent(item)">
            edit
        </v-icon>
        <v-icon small @click="deleteStudent(item)">
            delete
        </v-icon>
    </template>
</v-data-table>
</template>

<script>
import {
    createStudent
} from '@/axios/axios.js'
// import AddStudent from '@/components/AddStudent.vue'
// import Students from '@/components/Students.vue'
import {
    getStudents,
    deleteStudent,
    // updateStudent
} from '@/axios/axios'
export default {
    components: {
        // AddStudent,
    },
    data() {
        return {
            
            search: '',
            students: [],
            dialog: false,
            headers: [{
                    text: 'First Name',
                    align: 'left',
                    sortable: false,
                    value: 'firstname',
                },
                {
                    text: 'Last Name',
                    value: 'lastname',
                },
                {
                    text: 'Middle Name',
                    value: 'middlename',
                },
                {
                    text: 'Batch',
                    value: 'batch'
                },
                {
                    text: 'Username',
                    value: 'username'
                },
                {
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Password',
                    value: 'password'
                },
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                },
            ],
            editedIndex: -1,
            editedItem: {
                fname: '',
                lname: '',
                mname: '',
                batch: '',
                username: '',
                email: '',
                password: '',
            },
            defaultItem: {
                fname: '',
                lname: '',
                mname: '',
                batch: '',
                username: '',
                email: '',
                password: '',
            },
            show2: false,
            valid: true,
            fullname: '',
            batch: '',
            username: '',
            password: '',
            paswordRules: [
                v => !!v || 'Password is required',
                v => /^([a-zA-Z0-9@*#]{8,15})$/.test(v) || 'Password matching expression. Match all alphanumeric character and predefined wild characters. Password must consists of at least 8 characters and not more than 15 characters.',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            requiredRules: [
                v => !!v || 'This is Required Field'
            ],
        }
    },
    methods: {
        deleteStudent(items) {
            const index = this.students.indexOf(items)
            const student = this.students[index]
            deleteStudent(student._id)
                .then(() => {
                    this.$emit('deleteStudent', student._id);
                })
                .catch(err => alert(err.message));
            confirm('Are you sure you want to delete this item?') && this.students.splice(index, 1)
        },
        editStudent(item) {
            this.editedIndex = this.students.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        },
        create: function () {
            let data = {
                firstname: this.fname,
                lastname: this.lname,
                middlename: this.mname,
                batch: this.editedItem.batch,
                username: this.editedItem.username,
                email: this.editedItem.email,
                password: this.editedItem.password
            }
            createStudent(data)
                .then(data => {
                    this.$emit('createStudent', data.data);
                    this.email =this.fname = this.lname = this.mname =  this.password = this.username = this.fullname = this.batch = '';
                    this.dialog = false;
                })
                .catch(err => alert(err.message));
        },
    },
        mounted() {
            getStudents()
                .then(data => this.students = data.data)
                .catch((err => alert(err)));
        }
    }
</script>

<style>
</style>