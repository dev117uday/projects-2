from enum import Flag
from function import generate_token
import psycopg2
import os
import json
from dotenv import load_dotenv
load_dotenv()


sql_host = os.environ.get('host')
sql_user = os.environ.get('user')
sql_password = os.environ.get('password')
sql_database = os.environ.get('database')
GOOGLE_APPLICATION_CREDENTIALS = os.environ.get(
    'GOOGLE_APPLICATION_CREDENTIALS')

conn = psycopg2.connect(
    host=sql_host,
    database=sql_database,
    user=sql_user,
    password=sql_password,
)
cur = conn.cursor()


def create_db():
    cur = conn.cursor()
    try:
        query = """CREATE TABLE blockchain (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    uuid varchar(64),
    number varchar(64),
    hash varchar(64), 
	previous varchar(64),
	data varchar(1000),
	nonce varchar(15)
    );  """

        cur.execute(query)

    except:
        pass

    conn.commit()
    cur.close()
    return


def get_all_from_db():
    cur = conn.cursor()
    query = "SELECT * FROM blockchain;"
    cur.execute(query)
    records = cur.fetchall()
    conn.commit()
    cur.close()
    return json.dumps(records)


def generate_token_service():
    item = get_last_row()

    if item == False:
        cur = conn.cursor()
        token = generate_token()
        query = str("INSERT INTO blockchain (uuid) VALUES('%s');" % (token))
        cur.execute(query)
        conn.commit()
        cur.close()
        return token

    if item[2] == None:
        return item[1]
    else:
        pass

    cur = conn.cursor()
    token = generate_token()
    query = str("INSERT INTO blockchain (uuid) VALUES('%s');" % (token))
    cur.execute(query)
    conn.commit()
    cur.close()
    return token


def get_last_row():
    cur = conn.cursor()
    query = "SELECT * FROM blockchain ORDER BY id DESC LIMIT 1;"
    cur.execute(query)
    records = cur.fetchall()
    conn.commit()
    cur.close()

    try:
        return records[0]
    except IndexError:
        return False


def second_last_row():
    cur = conn.cursor()
    query = "select * from blockchain order by id DESC limit 2;"
    cur.execute(query)
    records = cur.fetchall()
    conn.commit()
    cur.close()
    return records[1]


def add_node_todb(block, last_row):

    num = 0
    if last_row[2] == None:
        num = 0
    else:
        num = int(last_row[2])+1

    num = str(num)

    cur = conn.cursor()
    query = str("update blockchain set number = %s, hash = '%s', previous = '%s', data = '%s', nonce = %s where uuid = '%s';" % (
        num, block.hash(), block.previous_hash, block.data, block.nonce, last_row[1]))
    cur.execute(query)
    conn.commit()
    cur.close()
    return True


def get_db_from_token(token):

    cur = conn.cursor()
    query = str("select * from blockchain where uuid = '%s';" % (token))
    cur.execute(query)
    records = cur.fetchall()
    if records == []:
        return {"msg": "token not found"}, 1
    conn.commit()
    cur.close()
    record = records[0]
    dict = {
        'id': record[0],
        'uuid': record[1],
        'number': record[2],
        'hash': record[3],
        'revious_hash': record[4],
        'data': record[5],
        'nonce': record[6]
    }
    return dict, 0
