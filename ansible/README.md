# Ansible Minichat

## Requirements

- Install [Ansible](http://docs.ansible.com/ansible/latest/intro_installation.html).
- Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads).
- Install [Vagrant](https://www.vagrantup.com/docs/installation).

## Getting started
Create 2 virtual machines:

```
$ vagrant up
```

Check that SSH works properly:

```
$ ssh vagrant1@localhost -p 2222
$ ssh vagrant2@localhost -p 2221
```

Install the required Ansible Galaxies:

```
$ ansible-galaxy install -r requirements.yml
```

Copy the example files, and updated the configuration according to your local
setup:

```
$ mv group_vars/test/ssh-keys/{private.example.yml,private.yml}
$ mv group_vars/test/ssh-keys/{public.example.yml,public.yml}
```

Run the main playbook:

```
$ ansible-playbook site.yml
```

## Challenges

- Encrypt a private SSH key located at `group_vars/test/ssh-keys/private.yml`
  using [ansible-vault][vault].
- Set a hostname.
- Install the following packages:
  - git
  - htop
  - nmap
  - strace
  - tmux
  - vim
- Open the SSH and HTTP ports.
- Install Stack using the [sb-debian-base][sb-debian-base] role.
- Set your name on the `MYNAME` environment variable on the systemd service file.
- Install [NGINX][nginx] using Ansible's [NGINX galaxy][nginx-galaxy].
- Serve the application using NGINX.

[nginx]: https://nginx.org/en
[nginx-galaxy]: https://galaxy.ansible.com/jdauphant/nginx
[sb-debian-base]: https://github.com/stackbuilders/sb-debian-base
[vault]: http://docs.ansible.com/ansible/latest/playbooks_vault.html
