-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "users" ("username", "hashedPassword")
    values ('coconutHead', 'rfseirfu');

insert into "reviews" ("title", "review", "userId", "rating", "photoUrl")
      values ('Pixel Perfect', 'a great tech movie that is way ahead of its time', '1', '4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_6mp_gpdbpSjw8HtuGG2d7IHv5MjH82HNQQ&s');
