Vagrant.configure('2') do |config|
  config.vm.box = "ubuntu/trusty64"
  config.ssh.forward_agent = true
  config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.synced_folder ".", "/home/vagrant/columbia", type: "rsync", rsync__exclude: ".git/"
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.provider "virtualbox" do |v|
    v.memory = 4096 
    v.cpus = 2
  end
end
