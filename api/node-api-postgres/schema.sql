DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS strelationship CASCADE;

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    classsubject VARCHAR(50) NOT NULL,
    imageurl text NOT NULL
);

INSERT INTO teachers (firstname, lastname, gender, classsubject, imageurl)
VALUES ('Steven', 'Fulakeza', 'm', 'Programming 1', 'https://i.imgur.com/b3jatQq.jpg?1');

INSERT INTO teachers (firstname, lastname, gender, classsubject, imageurl)
VALUES ('Carlos', 'Cruz', 'm', 'English', 'https://cdn.cnn.com/cnnnext/dam/assets/190424121508-01-rodney-robinson-teacher-of-the-year-trnd-large-169.jpg');

INSERT INTO teachers (firstname, lastname, gender, classsubject, imageurl)
VALUES ('Teacher', 'Diaz', 'f', 'Math', 'https://images-na.ssl-images-amazon.com/images/G/01/digital/video/hero/Movies/2011/B005JU5JEI_BadTeacher_UXSY1._V145020191_SX1080_.jpg');

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    imageurl text NOT NULL
);

INSERT INTO students (firstname, lastname, imageurl)
VALUES ('Emeka', 'Mbazor', 'https://avatars1.githubusercontent.com/u/47117694?s=460&v=4');

INSERT INTO students (firstname, lastname, imageurl)
VALUES ('Jonathan', 'Guzman', 'https://avatars2.githubusercontent.com/u/20092114?s=460&v=4');

INSERT INTO students (firstname, lastname, imageurl)
VALUES ('Cherena', 'Bradley', 'https://media-exp1.licdn.com/dms/image/C4D03AQGmx6FWVA2S-A/profile-displayphoto-shrink_800_800/0?e=1585180800&v=beta&t=Timi5cxhfcF5YFMGQfXDEhzb2rM0BvW9zuoIfmI3sL0');

INSERT INTO students (firstname, lastname, imageurl)
VALUES ('Chanyu', 'Chuong', 'https://media-exp2.licdn.com/dms/image/C4D03AQEs3n2dSfNmAw/profile-displayphoto-shrink_200_200/0?e=1585180800&v=beta&t=8mHsMROYwDPPEyBtlsFTN7OOfqA3ksivvPZzthC1mpU');


CREATE TABLE strelationship (
    teacherid INT NOT NULL,
    studentid INT NOT NULL,
    grade INT NOT NULL,
    FOREIGN KEY (teacherid) REFERENCES teachers(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (studentid) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE strelationship
ADD CONSTRAINT check_types
CHECK (grade >= 0 AND grade <= 100);

INSERT INTO strelationship (teacherid, studentid, grade)
VALUES (1, 1, 90), (1, 2, 85), (2, 3, 80), (3, 3, 100), (2, 1, 92);
