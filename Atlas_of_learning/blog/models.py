from py2neo import Graph, Node, Relationship
from passlib.hash import bcrypt
from datetime import datetime
#from bottle import get, run, request, response, static_file
import os
import uuid

url = os.environ.get('GRAPHENEDB_URL')
username = os.environ.get('NEO4J_USERNAME')
password = os.environ.get('NEO4J_PASSWORD')

graph = Graph(url + '/db/data/', username=username, password=password)

class User:
    def __init__(self, username):
        self.username = username


    def findi(self):
        user = graph.find_one('Instructor', 'username', self.username)
        return user

    def findlo(self, title):
        p= graph.find_one('LO', 'title', title)
        return p

    def registeri(self, password):
        if not self.findi():
            user = Node('Instructor', username=self.username, password=bcrypt.encrypt(password))
            graph.create(user)
            return True
        else:
            return False


    def verify_passwordi(self, password):
        user = self.findi()
        if user:
            return bcrypt.verify(password, user['password'])
        else:
            return False


    def add_lo(self, title, text):
        user = self.findi()
        lo=title.upper()
        s=self.findlo(lo)
        if not s:
            p=Node('LO', title=lo, description=text)
            graph.merge(p)


    def onegetgraph(self, title):
        x=title
        y=title.upper()
        nodes = []
        rels = []
        query='''
        MATCH (m:LO) WHERE m.title={title}
        RETURN m.title as name, m.description as adescription'''
        results=graph.run(query, title=y)
        for name, adescription in results:
            x={"name": name, "description":adescription, "label": "LO", "url":"", "level":1}
            nodes.append(x)

        x=title

        query='''
        MATCH (m:LO)<-[:Is_Prerequisite]-(b:LO) WHERE m.title={title}
        RETURN m.title as name, m.description as adescription, collect(b.title) as name2, collect(b.description) as bdescription
        '''
        results=graph.run(query, title=x)
        i = 0
        j=0
        for name, adescription, name2, bdescription in results:
            x={"name": name, "description":adescription, "label": "LO", "url":"", "level":1}
            try:
                target = nodes.index(x)
            except ValueError:
                nodes.append(x)
                target = i
                i += 1
            for nn in name2:
                aa= {"name": nn, "description":bdescription[j] ,"label": "LO", "url":"", "level":1}
                try:
                    source = nodes.index(aa)
                except ValueError:
                    nodes.append(aa)
                    source = i
                    i += 1
                j=j+1
        # print(nodes)
        i=0
        j=0
        for z in nodes:
            a=z['name']
#            print ("This is" + a)
            j=0
            for y in nodes:
                b=y['name']
#                print (b)
                query='''MATCH (m:LO)<-[:Is_Prerequisite]-(b:LO) WHERE m.title={a} AND b.title={b} return b.title as title'''
                results=graph.run(query, a=a, b=b)
                for title in results:
                    rels.append({"source": j, "target": i})
                j=j+1
            i=i+1
#            print ("i becoming ", i)

        return {"nodes": nodes, "links": rels}

    def degreegetgraph(self, a, y):
        x=a
        nodes = []
        rels = []
        query='''
        MATCH (m:LO) WHERE m.title={title}
        RETURN m.title as name, m.description as adescription'''
        results=graph.run(query, title=x)
        for name, adescription in results:
            x={"name": name, "description":adescription, "label": "LO", "url":"", "level":1}
            nodes.append(x)

        x=a
        query='''
        MATCH (m:LO)<-[:Is_Prerequisite*1..'''+y+''']-(b:LO) WHERE m.title={title}
        RETURN m.title as name, m.description as adescription, collect(b.title) as name2, collect(b.description) as bdescription
        '''
#        print(query)
        results=graph.run(query, title=x)
        i = 0
        j=0
        for name, adescription, name2, bdescription in results:
            x={"name": name, "description":adescription, "label": "LO", "url":"", "level":1}
            try:
                target = nodes.index(x)
            except ValueError:
                nodes.append(x)
                target = i
                i += 1
            for nn in name2:
                aa= {"name": nn, "description":bdescription[j] ,"label": "LO", "url":"", "level":1}
                try:
                    source = nodes.index(aa)
                except ValueError:
                    nodes.append(aa)
                    source = i
                    i += 1
                j=j+1
        i=0
        j=0
        for z in nodes:
            a=z['name']
#            print ("This is" + a)
            j=0
            for y in nodes:
                b=y['name']
#                print (b)
                query='''MATCH (m:LO)<-[:Is_Prerequisite]-(b:LO) WHERE m.title={a} AND b.title={b} return b.title as title'''
                results=graph.run(query, a=a, b=b)
                for title in results:
                    rels.append({"source": j, "target": i})
                j=j+1
            i=i+1
#            print ("i becoming ", i)

        return {"nodes": nodes, "links": rels}




    def function1(self, t):
        title=t.upper()
        query='''MATCH (x:LO) WHERE x.title contains {tt} RETURN x.title as title ORDER BY title'''
        return(graph.run(query, tt=title))

    def function2(self, t, z):
        title=t.upper()
        title1=z.upper()
        query='''MATCH (x:LO) MATCH(y:LO) WHERE (y.title={title1}) AND (x.title contains {tt}) AND (NOT (x)-[:Is_Prerequisite*0..1]->(y)) RETURN x.title as title ORDER BY title'''
        return(graph.run(query, tt=title, title1=title1))

    def function3(self, t, z):
        title=t.upper()
        title1=z.upper()
        query='''MATCH (x:LO) MATCH(y:LO) WHERE (y.title={title1}) AND (x.title contains {tt}) AND ((x)-[:Is_Prerequisite*1..1]->(y)) RETURN x.title as title ORDER BY title'''
        return(graph.run(query, tt=title, title1=title1))

    def makeconnection(self, a, b):
        x=a.upper()
        y=b.upper()
        i=0
        query='''MATCH (j:LO)-[r:Is_Prerequisite*1..]->(i:LO) where i.title={ii} AND j.title={jj} return j.title as title'''
        z=graph.run(query, ii=x, jj=y)
        for every in z:
            i=i+1
        if i>0:
            return 1
        query='''MATCH (i:LO) MATCH (j:LO) where i.title={ii} AND j.title={jj} CREATE (i)-[:Is_Prerequisite]->(j) return i, j'''
        graph.run(query, ii=x, jj=y)
        return 0

    def deleteconnection(self, a, b):
        x=a
        y=b
        query='''MATCH (i:LO)-[r:Is_Prerequisite]->(j:LO) where i.title={ii} AND j.title={jj} DELETE r'''
        graph.run(query, ii=x, jj=y)        


