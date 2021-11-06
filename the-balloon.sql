-- if exists drop table valid_color;
-- if exists  drop table invalid_color;

-- create table valid_color (id serial not null primary key, color_name text, count integer,UNIQUE(color_name));
-- create table invalid_color (id serial not null primary key, color_name text, count integer,UNIQUE(color_name));


-- insert into valid_color(color_name,count) values('Orange',0);
-- insert into valid_color(color_name,count) values('Purple',0);
-- insert into valid_color(color_name,count) values('Lime',0);