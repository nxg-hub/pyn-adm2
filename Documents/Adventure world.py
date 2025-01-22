import sys
import io
import random

# Set encoding to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

class Player:
    def __init__(self, name):
        self.name = name
        self.health = 100
        self.attack_power = 10
        self.heal_power = 15
        self.block_chance = 0.5
    
    def attack(self, enemy):
        damage = random.randint(5, self.attack_power)
        print(f"⚔️ {self.name} attacks {enemy.name} for {damage} damage!")
        enemy.take_damage(damage)
    
    def heal(self):
        heal_amount = random.randint(10, self.heal_power)
        self.health += heal_amount
        self.health = min(100, self.health)  # Max health is 100
        print(f"💖 {self.name} heals for {heal_amount} health. Current health: {self.health}")
    
    def block(self, enemy):
        if random.random() < self.block_chance:
            print(f"🛡️ {self.name} successfully blocks the attack from {enemy.name}!")
            return True
        print(f"❌ {self.name} failed to block the attack!")
        return False

    def take_damage(self, damage):
        self.health -= damage
        print(f"💥 {self.name} takes {damage} damage. Current health: {self.health}")
    
    def is_alive(self):
        return self.health > 0

class Enemy:
    def __init__(self, name, health, attack_power):
        self.name = name
        self.health = health
        self.attack_power = attack_power
    
    def attack(self, player):
        damage = random.randint(5, self.attack_power)
        print(f"👹 {self.name} attacks {player.name} for {damage} damage!")
        if not player.block(self):
            player.take_damage(damage)
    
    def take_damage(self, damage):
        self.health -= damage
        print(f"💥 {self.name} takes {damage} damage. Current health: {self.health}")
    
    def is_alive(self):
        return self.health > 0

def game():
    print("🌟 Welcome to the Adventure World! 🌟")
    player_name = input("Enter your character's name: ")
    player = Player(player_name)
    
    # Create a random enemy
    enemy_list = [
        Enemy("Goblin 🐲", 50, 8),
        Enemy("Orc 🧟", 70, 12),
        Enemy("Dragon 🐉", 120, 15)
    ]
    enemy = random.choice(enemy_list)
    
    print(f"⚠️ An enemy {enemy.name} appears with {enemy.health} health!")

    while player.is_alive() and enemy.is_alive():
        print("\nChoose your action:")
        print("1. ⚔️ Attack")
        print("2. 💖 Heal")
        print("3. 🛡️ Block")
        
        choice = input("Enter your choice (1/2/3): ")
        
        if choice == "1":
            player.attack(enemy)
        elif choice == "2":
            player.heal()
        elif choice == "3":
            print(f"{player.name} prepares to block the next attack.")
        else:
            print("❌ Invalid choice, please select 1, 2, or 3.")
            continue
        
        if enemy.is_alive():
            enemy.attack(player)
        else:
            print(f"🏆 You defeated the {enemy.name}!")
    
    if player.is_alive():
        print("🎉 You have won the battle!")
    else:
        print(f"☠️ {enemy.name} has defeated you. Game Over.")

if __name__ == "__main__":
    game()
