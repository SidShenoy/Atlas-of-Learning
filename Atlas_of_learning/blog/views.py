from .models import User
from flask import Flask, request, session, redirect, url_for, render_template, flash, jsonify, json

app = Flask(__name__)

@app.route('/')
def index():
#    posts = get_todays_recent_posts()
    return render_template('indexi.html')

@app.route('/graphindex/')
def graphindex():
#    posts = get_todays_recent_posts()
    return render_template('graphindex.html')

@app.route('/indexi')
def indexi():
#    posts = get_todays_recent_posts()
    return render_template('indexi.html')


@app.route('/add_lo_page')
def add_lo_page():
#    posts = get_todays_recent_posts()
    return render_template('addlopage.html')


@app.route('/newfirstsearch', methods=['POST'])
def newfirstsearch():
    x=request.form['title']
    if len(x)<1:
        flash('Your LO title must be at least one character.')
        return render_template('indexi.html')
    y=User("devvrit").function1(x)
    z=User("devvrit").function1(x)
    session['title'] = x
    i=0
    for every in z:
        i=i+1
        break
    if i<1:
        flash("No LO exist having this as substring")
        if not session.get('username'):
            return render_template('indexi.html')
    return render_template('indexi.html', parameter=y)

@app.route('/newsecondsearch/<title>')
def newsecondsearch(title):
    a=title
    session['title']=a
    x=User("devvrit").onegetgraph(a)
#    print(x)
    x=User("devvrit").onegetgraph(a)
    return render_template('indexi.html', ppar=x, parameter=None)


@app.route('/changedegree', methods=['POST'])
def changedegree():
    y=request.form['degree']
#    y=int(y)
    a=session['title']
    x=User("devvrit").degreegetgraph(a, y)
    return render_template('indexi.html', ppar=x, parameter=None)



@app.route('/graphssecondsearchinput/<title>')
def graphssecondsearchinput(title):
    a=title
    session['node'] = a
    return render_template('graphsecondsearchinput.html', title=a)


@app.route('/graphsecondsearchcombo/', methods=['POST'])
def graphsecondsearchcombo():
    x=request.form['title']
    if len(x)<1:
        flash("The prerequisite substring input must be at least one character long")
        return redirect(url_for('graphsecondsearchinput', title=session.get('node')))
    a=session.get('node')
    session['secondsearch']=x
    # print ("a is ", a)
    # print ("x is ", x)
    y=User("devvrit").function2(x, a)
    z=User("devvrit").function3(x, a)
    return render_template('graphsecondsearchcombo.html', parameter1=y, parameter2=z, title=a)

@app.route('/tgraphsecondsearch/')
def tgraphsecondsearch():
    a=session.get('title')
    x=session.get('secondsearch')
    if not x:
        return render_template('graphsecondsearchinput.html', title=a)
    y=User("devvrit").function2(x, a)
    z=User("devvrit").function3(x, a)
    return render_template('graphsecondsearchcombo.html', parameter1=y, parameter2=z, title=a)



@app.route('/graphmakeconnection/<title>')
def graphmakeconnection(title):
    a=title
    b=session.get('node')
    c=User(session['username']).makeconnection(a, b)
    if c>0:
        flash("Can't make it as a prerequisite, as it's forming a cycle")
        return redirect(url_for('tgraphsecondsearch'))
    return redirect(url_for('tgraphsecondsearch'))

@app.route('/graphdeleteconnection/<title>')
def graphdeleteconnection(title):
    a=title
    b=session.get('node')
    User(session['username']).deleteconnection(a, b)
    return redirect(url_for('tgraphsecondsearch'))


@app.route('/graphadd_lo', methods=['POST'])
def graphadd_lo():
    title = request.form['title']
    text = request.form['text']
    if not title:
        flash('You must give your LO a title.')
    elif not text:
        flash('You must give your lo resources a small description.')
    else:
        User(session['username']).add_lo(title, text)

    return redirect(url_for('graphmakeconnection', title=title))



@app.route('/iregister', methods=['GET','POST'])
def iregister():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if len(username) < 1:
            flash('Your username must be at least one character.')
        elif len(password) < 5:
            flash('Your password must be at least 5 characters.')
        elif not User(username).registeri(password):
            flash('A user with that username already exists.')
        else:
            session['username'] = username
            flash('Logged in.')
            return redirect(url_for('indexi'))

    return render_template('iregister.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if not (User(username).verify_passwordi(password)):
            flash('Invalid login.')
        elif User(username).verify_passwordi(password):
            session['username'] = username
            flash('Logged in.')
            return redirect(url_for('indexi'))

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('title', None)
    session.pop('node', None)
    flash('Logged out.')
    return redirect(url_for('indexi'))

@app.route('/add_lo', methods=['POST'])
def add_lo():
    title = request.form['title']
    text = request.form['text']
#    print (title)
    if not title:
        flash('You must give your LO a title.')
    elif not text:
        flash('You must give your lo resources a small description.')
    else:
        User(session['username']).add_lo(title, text)

    return redirect(url_for('add_lo_page'))


@app.route("/graph")
def graph():
    x=User(session['username']).get_graph()
#    y=gget_graph()
#    print (y)
    return render_template('graph.html', parameter=x)

