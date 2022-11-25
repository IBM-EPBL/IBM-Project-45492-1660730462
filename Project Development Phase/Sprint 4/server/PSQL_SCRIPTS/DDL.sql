create table users (
	id bigint not null, 
	name varchar not null,
	mobile varchar not null,
	email varchar not null,
	is_activated boolean default false,
	
	primary key (id)
	
)

create table users_otp (
	id bigint not null,
	users_id bigint not null,
	otp varchar,
	
	
	primary key (id),
	constraint users_fkey foreign key (users_id) references users(id)
)