### SQL(Structured Query Language)結構化查詢語言
* 所謂結構化就是一行一列的表格

### NoSQL(Not Only SQL)
1. Document base SQL
2. 具有特定的格式，包含欄位名稱及欄位內容
3. 利用JSON存擋，一筆文件就是一筆資料
4. BSON：存在電腦磁碟上用的格式， 但無法閱讀需反解譯成JSON
5. JSON 檔案：最大不能超過16MB
6. 數字型態：Decimal number double integer
7. MongoDB 最大差別有矩陣概念，可以擴充
8. Document 還可以包含有sub document。

#### 彈性及效能比較
1. 以往根據SQL關連式資料庫可能要join許多資料表才能查詢。但noSQL只需透過一次查詢即可以找到
2. NoSQL較直覺式
3. SQL較分散式(資料存在不同表格)，但使用上不能保證資料一致性。NoSQL較集中。
4. SQL資料做一次查詢會花費需多時間，因為資料分散在不同表格之中。
5. NoSQL每筆資料長度不需一致，SQL需一致，也產生浪費

#### Schema Validating
* Flexible Schema != schema free
* 既可以valid資料，又可以保有彈性，有些內容可以設為必填(required)，有些不用Ex. 人名、性別、電話(選填)
