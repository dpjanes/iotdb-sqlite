/*
 *  samples/native.js
 *
 *  David Janes
 *  IOTDB.org
 *  2020-10-15
 *
 *  Copyright (2013-2021) David P. Janes
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict"

const sqlite = require("sqlite3").verbose()
const db = new sqlite.Database(":memory:")
 
db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)")
})

db.serialize(function() {
    const statement = db.prepare("INSERT INTO lorem VALUES (?)")
    for (let i = 0; i < 10; i++) {
        statement.run("Ipsum " + i)
    }
    statement.finalize()

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info)
    })
})

db.close()
